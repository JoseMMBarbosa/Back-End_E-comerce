const mongoose = require('mongoose');

const reciboSchema = mongoose.Schema({
    idRecibo: {type: Number, required: true},
    idEncomenda: {type: Number, required: true},
    idCliente: {type: Number, required: true},
    datapagamento: {type: Date, required: true},
    metodopagamento: {type: String, required: true}
});

module.exports = mongoose.model('Recibo', reciboSchema);