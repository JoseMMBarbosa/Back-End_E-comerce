const mongoose = require('mongoose');

const tipoprodutoSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idSubcategoria: {type: mongoose.Schema.Types.ObjectId, ref: 'SubCategoria'},
    idQualificacao: {type: mongoose.Schema.Types.ObjectId, ref: 'Qualificacao'},
    nome: {type: String, required: true},
    designacao: {type: String}
    
});

module.exports = mongoose.model('TipoProduto', tipoprodutoSchema);