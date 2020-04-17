const mongoose = require('mongoose');

const localSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    nome: {type: String, required: true},
    distrito: {type: String, required: true},
    codigopostal: {type: String, required: true},
    //latitude: {type: String, required: true},
    //longitude: {type: String, required: true}
});

module.exports = mongoose.model('Local', localSchema);