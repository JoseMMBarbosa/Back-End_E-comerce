module.exports = (app) => {
    const encomenda = require('../controllers/encomenda.controller.js');

    // Create a new Order
    app.post('/encomenda', encomenda.create);

    // Retrieve all Order
    app.get('/encomenda', encomenda.findAll);

    app.post('/encomenda/encomendaCliente', encomenda.encomendaCliente);

    // Retrieve a single Order with orderId
    //app.get('/encomenda/:encomendaId', encomenda.findOne);

    // Update a Order with orderId
    app.put('/encomenda/:encomendaId', encomenda.update);

    // Delete a Order with orderId
    app.delete('/encomenda/:encomendaId', encomenda.delete);
}