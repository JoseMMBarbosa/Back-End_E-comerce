const moongoose = require('mongoose');

const URI = 'mongodb+srv://apieco:Ola123@ecommerce-dicvn.gcp.mongodb.net/test?retryWrites=true&w=majority';

const connectBD = async () => {
    await moongoose.createConnection(URI,{useNewUrlParser: true});
}; 

module.exports = connectBD;