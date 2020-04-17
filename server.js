const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// create express app
const app = express();

app.use(cors());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// Require routes
require('./app/routes/users.routes.js')(app);
require('./app/routes/cliente.routes.js')(app);
require('./app/routes/categoria.routes.js')(app);
require('./app/routes/local.routes.js')(app);
require('./app/routes/qualificacao.routes.js')(app);
require('./app/routes/produtor.routes.js')(app);
require('./app/routes/tipouser.routes')(app);
require('./app/routes/tipoproduto.routes')(app);
require('./app/routes/loteproduto.routes')(app);
require('./app/routes/subcategoria.routes')(app);
require('./app/routes/localqualificacao.routes')(app);
require('./app/routes/entidadecertificacao.routes')(app);
require('./app/routes/linhaenc.routes')(app);
require('./app/routes/encomenda.routes')(app);


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});