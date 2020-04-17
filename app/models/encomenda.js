const mongoose = require('mongoose');

const encomendaSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    email: {type: String, required: true},
    precociva: {type: Number, required: true},
    total: {type: Number, required: true},
    data: {type: Date},
    pago: {type: Boolean}
});

module.exports = mongoose.model('Encomenda', encomendaSchema);