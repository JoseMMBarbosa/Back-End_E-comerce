module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new User
    app.post('/usersCliente', users.createCliente);

    app.post('/usersProdutor', users.CreateProdutor);

    app.post('/usersAd', users.createAdmin);

    app.post('/login', users.login);

    app.get('/data', users.data);

    app.get('/users/clientes', users.findAllClientes);

    app.get('/users/admins', users.findAllAdmins);

    app.post('/users/deleteOne', users.deleteOne);

    app.post('/users/deleteOneAdmin', users.deleteOneAdmin);

    // Retrieve all User
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:usersId', users.findOne);

    // Update a user with userId
    app.put('/users/:userseId', users.update);

    // Delete a user with userId
    app.delete('/users/:usersId', users.delete);
}