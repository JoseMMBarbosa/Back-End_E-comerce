const mongoose = require('mongoose');

const produtorSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    contacto: {type: String, required: true},
    descricao: {type: String},
    idLocal: {type: mongoose.Schema.Types.ObjectId, ref: 'Local'},
    email: {type: String},
    nif: {type: String, required: true}
});

module.exports = mongoose.model('Produtor', produtorSchema);