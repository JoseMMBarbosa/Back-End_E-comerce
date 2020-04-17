const mongoose = require('mongoose');
const Local = require('../models/local.js');

// Create and Save a new Place
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "Place cannot be empty!"
        });
    }

    // Create a Place
    const local = new Local({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome, 
        distrito: req.body.distrito,
        codigopostal: req.body.codigopostal,
        //latitude: req.body.latitude,
        //longitude: req.body.longitude
    });

    // Save Place in the database
    local.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place."
        });
    });
};

// Retrieve and return all places from the database.
exports.findAll = (req, res) => {
    Local.find()
    .then(locals => {
        res.send(locals);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving places."
        });
    });
};

exports.deleteOne = (req, res) => {
    Local.remove({_id: req.body.locaId})
    .then(local => {
        if(!local) {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.body.locaId
            });
        }
        res.send({message: "Place deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.body.locaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete place with ID: " + req.body.locaId
        });
    });
};

exports.findOne = (req, res) => {
    Local.findById(req.params.localId)
    .then(local => {
        if(!local) {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });            
        }
        res.send(local);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving place with ID: " + req.params.localId
        });
    });
};

// Update a place identified by the placeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Place cannot be empty!"
        });
    }

    // Find note and update it with the request body
    Local.findByIdAndUpdate(req.params.localId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(local => {
        if(!local) {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });
        }
        res.send(local);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });                
        }
        return res.status(500).send({
            message: "Error updating place with id " + req.params.localId
        });
    });
}

// Delete a place with the specified placeId in the request
exports.delete = (req, res) => {
    Local.findByIdAndRemove(req.params.localId)
    .then(local => {
        if(!local) {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });
        }
        res.send({message: "Place deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The place could not be found! ID:" + req.params.localId
            });                
        }
        return res.status(500).send({
            message: "Could not delete place with ID: " + req.params.localId
        });
    });
};