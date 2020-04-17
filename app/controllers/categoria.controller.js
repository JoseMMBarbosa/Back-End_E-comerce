const mongoose = require('mongoose');
const Categoria = require('../models/categoria.js');

// Create and Save a New Category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nome) {
        return res.status(400).send({
            nome: "The category cannot be empty!"
        });
    }

    // Create a Category
    const categoria = new Categoria({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome, 
        descricao: req.body.descricao
    });

    // Save Category in the database
    categoria.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Category."
        });
    });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
    Categoria.find()
    .then(categorias => {
        res.send(categorias);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Categories."
        });
    });
};

exports.findOne = (req, res) => {
    Categoria.findById(req.params.categoriaId)
    .then(categoria => {
        if(!categoria) {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });            
        }
        res.send(categoria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving category with ID: " + req.params.categoriaId
        });
    });
};

exports.deleteOne = (req, res) => {
    Categoria.remove({_id: req.body.categoriaId})
    .then(categoria => {
        if(!categoria) {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.body.categoriaId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.body.categoriaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with ID: " + req.body.categoriaId
        });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "The category cannot be empty!"
        });
    }

    // Find category and update it with the request body
    Categoria.findByIdAndUpdate(req.params.categoriaId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(categoria => {
        if(!categoria) {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });
        }
        res.send(categoria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });                
        }
        return res.status(500).send({
            message: "Error updating category with ID: " + req.params.categoriaId
        });
    });
}

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Categoria.findByIdAndRemove(req.params.categoriaId)
    .then(categoria => {
        if(!categoria) {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The category could not be found! ID: " + req.params.categoriaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with ID: " + req.params.categoriaId
        });
    });
};