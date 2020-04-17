const mongoose = require('mongoose');

const linhaencSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idProdutor: {type: mongoose.Schema.Types.ObjectId , ref:'Produtor'},
    idEncomenda: {type: mongoose.Schema.Types.ObjectId, ref:'Encomenda'},
    email: {type: String, required: true},
    nome: {type: String, required: true},
    quantidade: {type: Number, required: true},
    preco: {type: Number, required: true},
    total: {type: Number, required: true},
    data: {type: Date}   
});

module.exports = mongoose.model('LinhaEnc', linhaencSchema);