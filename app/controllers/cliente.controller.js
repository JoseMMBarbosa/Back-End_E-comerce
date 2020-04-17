const mongoose = require('mongoose');
const Cliente = require('../models/cliente.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            nome: "Customer cannot be empty!"
        });
    }
    // Create a Customer
    const cliente = new Cliente({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome, 
        morada: req.body.morada, 
        localidade: req.body.localidade,
        codigopostal: req.body.codigopostal,
        contacto: req.body.contacto,
        email: req.body.email,
        nif: req.body.nif
    });
    // Save Customer in the database
    cliente.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

// Retrieve and return all customers from the database.
exports.findAll = (req, res) => {
    Cliente.find()
    .then(clientes => {
        res.send(clientes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

exports.findOne = (req, res) => {
    Cliente.findById(req.params.clienteId)
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId
            });            
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId

            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with ID: " + req.params.clienteId
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Customer cannot be empty!"
        });
    }

    // Find customer and update it with the request body
    Cliente.findByIdAndUpdate(req.params.clienteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(cliente => {
        if(!noclientete) {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId
            });
        }
        res.send(cliente);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with ID: " + req.params.clienteId
        });
    });
}

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    Cliente.findByIdAndRemove(req.params.clienteId)
    .then(cliente => {
        if(!cliente) {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The customer could not be found! ID: " + req.params.clienteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with ID: " + req.params.clienteId
        });
    });
};