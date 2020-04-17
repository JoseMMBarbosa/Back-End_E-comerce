const mongoose = require('mongoose');

const loteprodutoSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    idProdutor: {type: mongoose.Schema.Types.ObjectId, ref:'Produtor'},
    idTipoProduto: {type: mongoose.Schema.Types.ObjectId, ref:'TipoProduto'},
    idLocal: {type: mongoose.Schema.Types.ObjectId, ref:'Local'},
    idEntidade: {type: mongoose.Schema.Types.ObjectId, ref:'Entidade'},
    quantidade: {type: Number},
    nome: {type: String, require: true},
    email: {type: Number},
    stock: {type: Number, required: true},
    descricao: {type: String},
    dataInicio: {type: Date, required: true},
    dataValidade: {type: Date, required: true},
    preco:{type: Number, require: true},
    imagem:{type: String, require: true},
    numeroQualifica: {type: String, required: true}
});

module.exports = mongoose.model('LoteProduto', loteprodutoSchema);