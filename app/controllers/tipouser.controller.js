const mongoose = require('mongoose');
const User = require('../models/users.js');
const TipoUser = require('../models/tipouser.js');

// Create and Save a new User Type
exports.create = (req, res) => {
    // Validate request
    if(!req.body.tipo) {
        return res.status(400).send({
            message: "User Type cannot be empty!"
        });
    }

    // create
    const tipouser = new TipoUser({
        _id: mongoose.Types.ObjectId(),
        tipo: req.body.tipo
    });

    // Save User Type in the database
    tipouser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user type."
        });
    });
};

// Retrieve and return all user types from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(tipouser => {
        res.send(tipouser);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user types."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.tipouserId)
    .then(tipouser => {
        if(!tipouser) {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });            
        }
        res.send(tipouser);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user type with ID: " + req.params.tipouserId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User type cannot be empty!"
        });
    }

    TipoUser.findByIdAndUpdate(req.params.tipouserId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(tipouser => {
        if(!tipouser) {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });
        }
        res.send(tipouser);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });                
        }
        return res.status(500).send({
            message: "Error updating user type with ID: " + req.params.tipouserId
        });
    });
}

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.tipouserId)
    .then(tipouser => {
        if(!tipouser) {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The User Type could not be found! ID: " + req.params.tipouserId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user type with ID: " + req.params.tipouserId
        });
    });
};