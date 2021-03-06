const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    descricao: {type: String, required: true}
});

module.exports = mongoose.model('Entidade', categoriaSchema);