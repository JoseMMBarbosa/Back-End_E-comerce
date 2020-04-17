const mongoose = require('mongoose');
const Qualificacao = require('../models/qualificacao.js');
const entidadecertificacao = require('../models/entidadecertificacao.js');

// Create and Save a new Qualification
exports.create = (req, res) => {
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "Qualification cannot be empty!"
        });
    }
    entidadecertificacao.findOne({_id: req.body.idEntidadeCerticadora}, function(err, result) {
        if (err) {
            throw err};
        console.log(result._id);

    // Create a Qualification
    const qualificacao = new Qualificacao({
        _id: mongoose.Types.ObjectId(),
        idEntidadeCerticadora: result._id,
        nome: req.body.nome, 
        descricao: req.body.descricao
    });

    // Save Qualification in the database
    qualificacao.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Qualification."
        });
    });
});
};

// Retrieve and return all qualifications from the database.
exports.findAll = (req, res) => {
    Qualificacao.find().populate('idEntidadeCerticadora')
    .then(qualificacaos => {
        res.send(qualificacaos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving qualifications."
        });
    });
};

exports.findOne = (req, res) => {
    Qualificacao.findById(req.params.qualificacaoId)
    .then(qualificacao => {
        if(!qualificacao) {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });            
        }
        res.send(qualificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving qualification with ID: " + req.params.qualificacaoId
        });
    });
};

exports.deleteOne = (req, res) => {
    Qualificacao.remove({_id: req.body.certificacaoId})
    .then(qualificacao => {
        if(!qualificacao) {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.body.certificacaoId
            });
        }
        res.send({message: "Qualification deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.body.certificacaoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete qualification with id " + req.body.certificacaoId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Qualification cannot be empty!"
        });
    }

    Qualificacao.findByIdAndUpdate(req.params.qualificacaoId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(qualificacao => {
        if(!qualificacao) {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });
        }
        res.send(qualificacao);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error updating qualification with ID: " + req.params.qualificacaoId
        });
    });
}


exports.delete = (req, res) => {
    Qualificacao.findByIdAndRemove(req.params.qualificacaoId)
    .then(qualificacao => {
        if(!qualificacao) {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });
        }
        res.send({message: "Qualification deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The qualification could not be found! ID: " + req.params.qualificacaoId
            });                
        }
        return res.status(500).send({
            message: "Error deleting qualification with ID: " + req.params.qualificacaoId
        });
    });
};