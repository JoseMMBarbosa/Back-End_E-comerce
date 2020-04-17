const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idProdutor: {type: mongoose.Schema.Types.ObjectId, ref: 'Produtor'},
    idCliente: {type: mongoose.Schema.Types.ObjectId, ref: 'Cliente'},
    email: {type: String, required: true},
    user: {type: String},
    pass: {type: String, required: true},
    nome: {type: String},
    contacto: {type: String},
    tipoUser: {type: Number, required: true},
    morada: {type: String},
    localidade: {type: String},
    nif: {type: String}    

}, {
    timestamps: true
});

module.exports = mongoose.model('Users', usersSchema);