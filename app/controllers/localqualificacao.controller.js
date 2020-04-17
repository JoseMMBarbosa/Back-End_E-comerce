const mongoose = require('mongoose');
const Localqualificacao = require('../models/localqualificacao.js');
const Local = require ('../models/local.js');
const Qualificacao = require ('../models/qualificacao.js');

// Create and Save a new Place Qualification
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idLocal) {
        return res.status(400).send({
            nome: "Place Qualification cannot be empty!"
        });
    }

    Local.findOne({_id: req.body.idLocal}, function(err, result) {
        if (err) {
            return res.status(400).send({
                nome: "Producer ID was not found!"
            });
        }
        console.log(result._id);
        Qualificacao.findOne({_id: req.body.idQualificacao}, function(err, result1) {
            if (err) {
                throw err};
            console.log(result1._id);
    
    // Create a PlaceQualification
    const localqualificacao = new Localqualificacao({
        _id: mongoose.Types.ObjectId(),
        idLocal: result._id,
        idQualificacao: result1._id

    });

    // Save PlaceQualification in the database
    localqualificacao.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Place Qualification."
        });
    });
});
});
};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Localqualificacao.find()
    .then(localqualificacaos => {
        res.send(localqualificacaos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Place Qualifications."
        });
    });
};

exports.findOne = (req, res) => {
    Localqualificacao.findById(req.params.localqualificacaoId)
    .then(localqualificacao => {
        if(!localqualificacao) {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });            
        }
        res.send(localqualificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving place qualification with id " + req.params.localqualificacaoId
        });
    });
};

// Update a place qualification identified by the placequalificationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Place qualification cannot be empty!"
        });
    }

    // Find note and update it with the request body
    Localqualificacao.findByIdAndUpdate(req.params.localqualificacaoId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(localqualificacao => {
        if(!localqualificacao) {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });
        }
        res.send(localqualificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error updating place qualification with ID: " + req.params.localqualificacaoId
        });
    });
}

// Delete a place qualification with the specified placequalificationId in the request
exports.delete = (req, res) => {
    Localqualificacao.findByIdAndRemove(req.params.localqualificacaoId)
    .then(localqualificacao => {
        if(!localqualificacao) {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });
        }
        res.send({message: "Place Qualification deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The place qualification could not be found! ID:" + req.params.localqualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete place qualification with id " + req.params.localqualificacaoId
        });
    });
};