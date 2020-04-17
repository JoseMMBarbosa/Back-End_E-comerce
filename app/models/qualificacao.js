const mongoose = require('mongoose');

const qualificacaoSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idEntidadeCerticadora: {type: mongoose.Schema.Types.ObjectId, ref: 'Entidade'},
    nome: {type: String, required: true},
    descricao: {type: String, required: true}
    
});

module.exports = mongoose.model('Qualificacao', qualificacaoSchema);