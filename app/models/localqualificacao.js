const mongoose = require('mongoose');

const localqualificacaoSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idLocal: {type: mongoose.Schema.Types.ObjectId , ref: 'Local'},
    idQualificacao: {type: mongoose.Schema.Types.ObjectId , ref: 'Qualificacao'},
});

module.exports = mongoose.model('LocalQualificacao', localqualificacaoSchema);