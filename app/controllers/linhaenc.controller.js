const mongoose = require('mongoose');
const Linhaenc = require('../models/linhaenc.js');
const Produtor = require('../models/produtor');

// Create and Save a new Line
exports.create = (req, res) => {

    for( let i in req.body.produto){

        const linhaenc = new Linhaenc({
            _id: mongoose.Types.ObjectId(),
            email: req.body.email,
            idProdutor: req.body.produto[i].idProdutor,
            idEncomenda: req.body.idEncomenda,
            nome: req.body.produto[i].nome,
            quantidade: req.body.produto[i].quantidade,
            preco: req.body.produto[i].preco,
            total: req.body.produto[i].preco * req.body.produto[i].quantidade,
            totalIva: req.body.produto[i].preco * 1.23,
            data: Date.now(),
        });

        // Save Line in the database
        linhaenc.save()
        .then(data => {
          return  res.send(data);
        }).catch(err => {
        });
    };
};

// Retrieve and return all lines from the database.
exports.findAll = (req, res) => {
    Linhaenc.find()
    .then(linhaencs => {
        res.send(linhaencs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving line."
        });
    });
};

exports.linhaProdutor = (req, res) => {
    Produtor.findOne({email: req.body.email}, function(err, result) {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving lines."
            });
        } else if (result) {        
            console.log(result._id)
            Linhaenc.find({idProdutor: result._id})
            .then(linhaencs => {
                res.send(linhaencs);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving lines."
                });
            });
        }
    });
};

exports.findOne = (req, res) => {
    Linhaenc.findById(req.params.linhaencId)
    .then(linhaenc => {
        if(!linhaenc) {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });            
        }
        res.send(linhaenc);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving line with ID: " + req.params.linhaencId
        });
    });
};

// Update a line identified by the lineId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Line cannot be empty!"
        });
    }

    // Find line and update it with the request body
    Linhaenc.findByIdAndUpdate(req.params.linhaencId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(linhaenc => {
        if(!linhaenc) {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });
        }
        res.send(linhaenc);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });                
        }
        return res.status(500).send({
            message: "Error updating line with ID: " + req.params.linhaencId
        });
    });
}

// Delete a line with the specified lineId in the request
exports.delete = (req, res) => {
    Linhaenc.findByIdAndRemove(req.params.linhaencId)
    .then(linhaenc => {
        if(!linhaenc) {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });
        }
        res.send({message: "Line deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The line could not be found! ID:" + req.params.linhaencId
            });                
        }
        return res.status(500).send({
            message: "Could not delete line with ID: " + req.params.linhaencId
        });
    });
};