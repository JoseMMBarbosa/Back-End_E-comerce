const mongoose = require('mongoose');

const subcategoriaSchema = mongoose.Schema({
    idSubcategoria: {type: mongoose.Schema.Types.ObjectId},
    idCategoria: {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'},
    nome: {type: String, required: true},
    designacao: {type: String, required: true}
});

module.exports = mongoose.model('SubCategoria', subcategoriaSchema);