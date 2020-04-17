module.exports = (app) => {
    const tipouser = require('../controllers/tipouser.controller.js');

    // Create a new User Type
    app.post('/tipoUser', tipouser.create);

    // Retrieve all User Types
    app.get('/tipoUser', tipouser.findAll);

    // Retrieve a single User Type with usertypeId
    app.get('/tipoUser/:tipouserId', tipouser.findOne);

    // Update a User Type with usertypeId
    app.put('/tipouser/:tipouserId', tipouser.update);

    // Delete a User Type with usertypeId
    app.delete('/tipouser/:tipouserId', tipouser.delete);
}