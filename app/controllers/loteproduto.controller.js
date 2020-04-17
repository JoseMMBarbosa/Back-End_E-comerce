const mongoose = require('mongoose');
const Loteproduto = require('../models/loteproduto.js');
const Produtor = require('../models/produtor.js');
const TipoProduto = require('../models/tipoproduto.js');
const Local = require('../models/local.js');

// Create and Save a new lot
exports.create = (req, res) => {
    // Validate request
    if(!req.body.numeroQualifica) {
        return res.status(400).send({
            nome: "Lot cannot be empty!"
        });
    }

    Produtor.findOne({email: req.body.email}, function(err, result) {
        if (err) { throw err };
        TipoProduto.findOne({_id: req.body.idTipoProduto}, function(err, result1) {
            if (err) {
                throw err};
            console.log(result1._id);
            Local.findOne({_id: req.body.idLocal}, function(err, result2) {
                if (err) {
                    throw err};
                console.log(result2._id);

    // Create a lot
    const loteproduto = new Loteproduto({
        _id: mongoose.Types.ObjectId(),
        idProdutor: result._id,
        idTipoProduto: result1._id,
        idLocal: result2._id,
        idEntidade : req.body.idEntidade,
        nome: req.body.nome,
        quantidade: 1,
        stock: req.body.stock,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio,
        dataValidade: req.body.dataValidade,
        preco: req.body.preco,
        imagem: req. body.imagem,
        numeroQualifica: req.body.numeroQualifica
    });

    // Save lot in the database
    loteproduto.save()
            .then(data => {
                 res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                        message: err.message || "Some error occurred while creating the lot."
                    });
                });
            });
        });
    });
};

exports.updateProduto = (req, res) => {
    // Validate Request
    for( let i in req.body.produto){
    Loteproduto.findByIdAndUpdate(req.body.produto[i]._id, {
        stock: (req.body.produto[i].stock - req.body.produto[i].quantidade),
    }, {new: true})
    .then(loteprodutos => {
        if(!loteprodutos) {
            return res.status(404).send({
                message: "The lot could not be found! ID:" + req.body._id
            });
        }
        console.log(ola);
        res.send(loteprodutos);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The lot could not be found! ID:" + req.body._id
            });                
        }
    });
    };
}

exports.deleteOne = (req, res) => {
    Loteproduto.remove({_id: req.body.produtoId})
    .then(loteproduto => {
        if(!loteproduto) {
            return res.status(404).send({
                message: "The lot could not be found! ID:" + req.body.produtoId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The lot could not be found! ID:" + req.body.produtoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lot with ID: " + req.body.produtoId
        });
    });
};

exports.produtorProdutor = (req, res) => {
    Produtor.findOne({email: req.body.email}, function(err, result) {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving producer."
            });
        } else if (result) {        
            console.log(result._id)
            Loteproduto.find({idProdutor: result._id}).populate('idLocal').populate('idEntidade')
            .then(loteprodutos => {
                res.send(loteprodutos);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving lots."
                });
            });
        }
    });
};

exports.produtoTipoProduto = (req, res) =>{
    Loteproduto.find({idTipoProduto: req.body.idTipoProduto}).populate('idLocal')
        .then(loteprodutos => {
            res.send(loteprodutos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving lots."
        });
    });

}

exports.produtoNome = (req, res) =>{
    var name = req.body.nome;
    Loteproduto.find({nome: { $regex: '.*' + name + '.*' }})
        .then(loteprodutos => {
            res.send(loteprodutos);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving lots."
        });
    });

}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Loteproduto.find().populate('idLocal').populate('idEntidade')
    .then(loteprodutos => {
        res.send(loteprodutos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lots."
        });
    });
};

exports.findOne = (req, res) => {
    Loteproduto.findById(req.params.clienteId).populate('idLocal')
    .then(loteproduto => {
        if(!loteproduto) {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });            
        }
        res.send(loteproduto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving lot with ID: " + req.params.loteprodutoId
        });
    });
};


// Update a lot identified by the lotId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Lot cannot be empty!"
        });
    }

    // Find lot and update it with the request body
    Loteproduto.findByIdAndUpdate(req.params.loteprodutoId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(loteproduto => {
        if(!loteproduto) {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });
        }
        res.send(loteproduto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });                
        }
        return res.status(500).send({
            message: "Error updating lot with ID: " + req.params.loteprodutoId
        });
    });
}

// Delete a lot with the specified lotId in the request
exports.delete = (req, res) => {
    Loteproduto.findByIdAndRemove(req.params.loteprodutoId)
    .then(loteproduto => {
        if(!loteproduto) {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });
        }
        res.send({message: "Lot deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The lot could not be found! ID: " + req.params.loteprodutoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lot with ID: " + req.params.loteprodutoId
        });
    });
};