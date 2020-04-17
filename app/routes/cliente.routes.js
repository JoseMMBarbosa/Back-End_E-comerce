module.exports = (app) => {
    const cliente = require('../controllers/cliente.controller.js');

    // Create a new Customer
    app.post('/cliente', cliente.create);

    // Retrieve all Customers
    app.get('/cliente', cliente.findAll);

    // Retrieve a single Customer with customerId
    app.get('/cliente/:clienteId', cliente.findOne);

    // Update a Customer with CustomerId
    app.put('/cliente/:clienteId', cliente.update);

    // Delete a Customer with customerId
    app.delete('/cliente/:clienteId', cliente.delete);
}