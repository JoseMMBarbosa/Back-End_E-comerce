const mongoose = require('mongoose');
const Recibo = require('../models/recibo.js');

// Create and Save a new Receipt
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "Receipt cannot be empty!"
        });
    }
    

    const recibo = new Recibo({
        _id: mongoose.Types.ObjectId(),
        //id Encomenda
        //idCliente
        datapagamento: req.body.datapagamento,
        metodopagamento: req.body.metodopagamento
    });

    // Save Receipt in the database
    recibo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the receipt."
        });
    });
};

// Retrieve and return all receipts from the database.
exports.findAll = (req, res) => {
    Recibo.find()
    .then(recibos => {
        res.send(recibos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving receipts."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.reciboId)
    .then(recibo => {
        if(!recibo) {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });            
        }
        res.send(recibo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving receipt with ID: " + req.params.reciboId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Receipt cannot be empty!"
        });
    }

    User.findByIdAndUpdate(req.params.reciboId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(recibo => {
        if(!recibo) {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });
        }
        res.send(recibo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });                
        }
        return res.status(500).send({
            message: "Error updating receipt with id " + req.params.reciboId
        });
    });
}

exports.delete = (req, res) => {
    Recibo.findByIdAndRemove(req.params.reciboId)
    .then(recibo => {
        if(!recibo) {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });
        }
        res.send({message: "Receipt deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The receipt could not be found! ID: " + req.params.reciboId
            });                
        }
        return res.status(500).send({
            message: "Could not delete receipt with ID: " + req.params.reciboId
        });
    });
};

