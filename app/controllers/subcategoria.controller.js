const mongoose = require('mongoose');
const Subcategoria = require('../models/subcategoria.js');
const categoria = require('../models/categoria.js')

// Create and Save a new Subcategory
exports.create = (req, res) => {
    // Validate request
    if(!req.body.idCategoria) {
        return res.status(400).send({
            nome: "Subcategory cannot be empty!"
        });
    }
    
    categoria.findOne({_id: req.body.idCategoria}, function(err, result) {
        if (err) {
            throw err};
        console.log(result._id);

    // Create a Subcategory
    const subcategoria = new Subcategoria({
        _id: mongoose.Types.ObjectId(),
        idCategoria: result._id,
        nome: req.body.nome,
        designacao: req.body.designacao

    });

    // Save subcategory in the database
    subcategoria.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the subcategory."
        });
    });
});
};

// Retrieve and return all subcategories from the database.
exports.findAll = (req, res) => {
    Subcategoria.find().populate('idCategoria')
    .then(subcategorias => {
        res.send(subcategorias);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subcategories."
        });
    });
};

exports.deleteOne = (req, res) => {
    Subcategoria.remove({_id: req.body.subCategoriaId})
    .then(subcategorias => {
        if(!subcategorias) {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.body.subCategoriaId
            });
        }
        res.send({message: "Subcategory deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.body.subCategoriaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete subcategory with ID: " + req.body.subCategoriaId
        });
    });
};

exports.findOne = (req, res) => {
    Subcategoria.findById(req.params.subcategoriaId)
    .then(subcategoria => {
        if(!subcategoria) {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });            
        }
        res.send(subcategoria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving subcategory with ID: " + req.params.subcategoriaId
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Subcategory cannot be empty!"
        });
    }

    Subcategoria.findByIdAndUpdate(req.params.subcategoriaId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(subcategoria => {
        if(!subcategoria) {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });
        }
        res.send(subcategoria);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });                
        }
        return res.status(500).send({
            message: "Error updating subcategory with ID: " + req.params.subcategoriaId
        });
    });
}

exports.delete = (req, res) => {
    Subcategoria.findByIdAndRemove(req.params.subcategoriaId)
    .then(subcategoria => {
        if(!subcategoria) {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });
        }
        res.send({message: "Subcategory deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "The subcategory could not be found! ID: " + req.params.subcategoriaId
            });                
        }
        return res.status(500).send({
            message: "Could not delete subcategory with ID: " + req.params.subcategoriaId
        });
    });
};