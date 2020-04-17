const mongoose = require('mongoose');
const Entidadecertificacao = require('../models/entidadecertificacao.js');

// Create and Save a new Entity
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "Entity cannot be empty!"
        });
    }

    // Create a Entity
    const entidadecertificacao = new Entidadecertificacao({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome, 
        descricao: req.body.descricao
    });

    // Save Entity in the database
    entidadecertificacao.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Entity."
        });
    });
};

// Retrieve and return all entities from the database.
exports.findAll = (req, res) => {
    Entidadecertificacao.find()
    .then(entidadecertificacoes => {
        res.send(entidadecertificacoes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Entities."
        });
    });
};

exports.deleteOne = (req, res) => {
    Entidadecertificacao.remove({_id: req.body.entidadeId})
    .then(entidadecertificacoes => {
        if(!entidadecertificacoes) {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.body.entidadeId
            });
        }
        res.send({message: "Entity deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.body.entidadeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete entity with ID: " + req.body.entidadeId
        });
    });
};

exports.findOne = (req, res) => {
    Entidadecertificacao.findById(req.params.EntidadecertificacaoId)
    .then(entidadecertificacao => {
        if(!entidadecertificacao) {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });            
        }
        res.send(entidadecertificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving entity with ID: " + req.params.EntidadecertificacaoId
        });
    });
};

// Update a entity identified by the entityId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Entity cannot be empty!"
        });
    }

    // Find entity and update it with the request body
    Entidadecertificacao.findByIdAndUpdate(req.params.EntidadecertificacaoId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(entidadecertificacao => {
        if(!entidadecertificacao) {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });
        }
        res.send(entidadecertificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error updating entity with ID: " + req.params.EntidadecertificacaoId
        });
    });
}

// Delete an entity with the specified entityId in the request
exports.delete = (req, res) => {
    Entidadecertificacao.findByIdAndRemove(req.params.EntidadecertificacaoId)
    .then(entidadecertificacao => {
        if(!entidadecertificacao) {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The entity could not be found! ID: " + req.params.EntidadecertificacaoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete entity with ID: " + req.params.EntidadecertificacaoId
        });
    });
};