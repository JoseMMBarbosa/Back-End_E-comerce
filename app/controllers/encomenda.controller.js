const mongoose = require('mongoose');
const Encomenda = require('../models/encomenda.js');
const User = require('../models/users.js')

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            nome: "Order cannot be empty!"
        });
    }
    // Create an Order
    const encomenda = new Encomenda({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        precociva: req.body.precociva,
        total: req.body.total,
        data: Date.now(),
        pago: "true",
    });
    // Save Order in the database
    encomenda.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Order."
        });
    });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Encomenda.find()
    .then(encomendas => {
        res.send(encomendas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

exports.encomendaCliente = (req, res) => {
    User.findOne({email: req.body.email}, function(err, result) {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        } else if (result) {        
            console.log(result.email)
            Encomenda.find({email: result.email})
            .then(encomendas => {
                res.send(encomendas);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving orders."
                });
            });
        }
    });
};

/*
exports.findOne = (req, res) => {
    Encomenda.findById(req.params.encomendaId)
    .then(encomenda => {
        if(!encomenda) {
            return res.status(404).send({
                message: "cliente not found with id " + req.params.encomendaId
            });            
        }
        res.send(encomenda);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "cliente not found with id " + req.params.encomendaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cliente with id " + req.params.encomendaId
        });
    });
};
*/

// Update an order identified by the orderId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Order cannot be empty!"
        });
    }

    // Find note and update it with the request body
    Encomenda.findByIdAndUpdate(req.params.encomendaId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(encomenda => {
        if(!encomenda) {
            return res.status(404).send({
                message: "The order could not be found! ID: " + req.params.encomendaId
            });
        }
        res.send(encomenda);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The order could not be found! ID: " + req.params.encomendaId
            });                
        }
        return res.status(500).send({
            message: "Error updating order with ID: " + req.params.encomendaId
        });
    });
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Encomenda.findByIdAndRemove(req.params.encomendaId)
    .then(encomenda => {
        if(!encomenda) {
            return res.status(404).send({
                message: "The order could not be found! ID: " + req.params.encomendaId
            });
        }
        res.send({message: "Order deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The order could not be found! ID: " + req.params.encomendaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete order with ID: " + req.params.encomendaId
        });
    });
};