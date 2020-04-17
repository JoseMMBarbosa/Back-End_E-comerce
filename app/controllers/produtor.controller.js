const mongoose = require('mongoose');
const Produtor = require('../models/produtor.js');
const local = require('../models/local.js');

// Create and Save a new Producer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "Producer cannot be empty!"
        });
    }

    local.findOne({_id: req.body.idLocal}, function(err, result) {
        if (err) {
            throw err};
        console.log(result._id);

        // Create a Producer
        const produtor = new Produtor({
        _id: mongoose.Types.ObjectId(),
        idLocal: result._id,
        nome: req.body.nome, 
        contacto: req.body.contacto,
        descricao: req.body.descricao, 
        email: req.body.email,
        nif: req.body.nif

        });

        // Save Producer in the database
        produtor.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Producer."
            });
        });
    });
};

exports.deleteOne = (req, res) => {
    Produtor.remove({_id: req.body.produtorId})
    .then(produtor => {
        if(!produtor) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });
        }
        res.send({message: "Producer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });                
        }
        return res.status(500).send({
            message: "Could not delete producer with ID: " + req.params.produtorId
        });
    });
};


exports.updateProdutor = (req, res) => {
    // Validate Request
    if(!req.body._id) {
        return res.status(400).send({
            message: "Producer cannot be empty!"
        });
    }

    // Find producer and update it with the request body
    Produtor.findByIdAndUpdate(req.body._id, {
        nome: req.body.nome,
        idLocal: req.body.idLocal,
        contacto: req.body.contacto,
        nif: req.body.nif
    }, {new: true})
    .then(produtores => {
        if(!produtores) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.body._id
            });
        }
        res.send(produtores);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.body._id
            });                
        }
        return res.status(500).send({
            message: "Error updating producer with ID: " + req.body._id
        });
    });
}

exports.updateFinal = (req, res) => {
    Produtor.findByIdAndUpdate(req.body._id, {
        nome: req.body.nome,
        idLocal: req.body.idLocal,
        contacto: req.body.contacto,
        nif: req.body.nif,
    }, {new: true})
    .then(produtores => {
        if(!produtores) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.body._id
            });
        }
        console.log(ola);
        res.send(produtores);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.body._id
            });                
        }
    });
}


// Retrieve and return all producers from the database.
exports.findAll = (req, res) => {
    Produtor.find().populate('idLocal')
    .then(produtores => {
        res.send(produtores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving producers."
        });
    });
};


exports.findOne = (req, res) => {
    Produtor.findById(req.params.produtorId)
    .then(produtor => {
        if(!produtor) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });            
        }
        res.send(produtor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving producer with ID: " + req.params.produtorId
        });
    });
};

// Update a producer identified by the producerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Producer cannot be empty!"
        });
    }

    // Find note and update it with the request body
    Produtor.findByIdAndUpdate(req.params.produtorId, {
        title: req.body.title,
        idLocal: req.body.content,
        contacto: req.body.contacto,
        nif: req.body.nif
    }, {new: true})
    .then(produtor => {
        if(!produtor) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });
        }
        res.send(produtor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });                
        }
        return res.status(500).send({
            message: "Error updating producer with ID: " + req.params.produtorId
        });
    });
}

// Delete a producer with the specified producerId in the request
exports.delete = (req, res) => {
    Produtor.findByIdAndRemove(req.params.produtorId)
    .then(produtor => {
        if(!produtor) {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The producer could not be found! ID: " + req.params.produtorId
            });                
        }
        return res.status(500).send({
            message: "Could not delete producer with ID: " + req.params.produtorId
        });
    });
};