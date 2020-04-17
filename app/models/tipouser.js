const mongoose = require('mongoose');

const tipouserSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    tipo: {type: String, required: true}
});

module.exports = mongoose.model('TipoUser', tipouserSchema);