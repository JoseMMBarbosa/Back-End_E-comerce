const mongoose = require('mongoose');
const Tipoproduto = require('../models/tipoproduto.js');
const SubCat = require('../models/subcategoria.js');
const Qualificacao = require('../models/qualificacao.js');

// Create and Save a new ProductType
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "Product Type cannot be empty!"
        });
    }
    SubCat.findOne({_id: req.body.idSubcategoria}, function(err, result) {
        if (err) {
            throw err};
        console.log(result._id);

        Qualificacao.findOne({_id: req.body.idQualificacao}, function(err, result1) {
            if (err) {
                throw err};
            console.log(result1._id);

    // Create a Product Type
    const tipoproduto = new Tipoproduto({
        _id: mongoose.Types.ObjectId(),
        idSubcategoria: result._id,
        idQualificacao: result1._id,
        nome: req.body.nome, 
        designacao: req.body.designacao

    });

    // Save Product Type in the database
    tipoproduto.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product Type."
        });
    });
});
});
};

// Retrieve and return all product types from the database.
exports.findAll = (req, res) => {
    Tipoproduto.find().populate('idQualificacao').populate('idSubcategoria')
    .then(tipoprodutos => {
        res.send(tipoprodutos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product types."
        });
    });
};

exports.findOne = (req, res) => {
    Tipoproduto.findById(req.params.tipoprodutoId)
    .then(tipoproduto => {
        if(!tipoproduto) {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoprodutoId
            });            
        }
        res.send(tipoproduto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoprodutoId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product type with ID: " + req.params.tipoprodutoId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Product type cannot be empty!"
        });
    }

    Tipoproduto.findByIdAndUpdate(req.params.tipoprodutoId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(tipoproduto => {
        if(!tipoproduto) {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoprodutoId
            });
        }
        res.send(tipoproduto);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoprodutoId
            });                
        }
        return res.status(500).send({
            message: "Error updating product type with ID: " + req.params.tipoprodutoId
        });
    });
}

exports.deleteOne = (req, res) => {
    Tipoproduto.deleteOne({_id: req.body.tipoProdutoId})
    .then(tipoproduto => {
        if(!tipoproduto) {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.body.tipoProdutoId
            });
        }
        res.send({message: "Product type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.body.tipoProdutoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product type with ID: " + req.body.tipoProdutoId
        });
    });
};

exports.delete = (req, res) => {
    Tipoproduto.findByIdAndRemove(req.params.tipoProdutoId)
    .then(tipoproduto => {
        if(!tipoproduto) {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoProdutoId
            });
        }
        res.send({message: "Product type deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The Product Type could not be found! ID: " + req.params.tipoProdutoId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product type with ID: " + req.params.tipoProdutoId
        });
    });
};