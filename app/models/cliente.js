const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String},
    morada: {type: String},
    localidade: {type: String},
    codigopostal: {type: String},
    contacto: {type: String},
    email: {type: String},
    nif: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);