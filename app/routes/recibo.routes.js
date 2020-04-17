module.exports = (app) => {
    const recibo = require('../controllers/recibo.controller.js');

    // Create a new Receipt
    app.post('/recibo', recibo.create);

    // Retrieve all Receipts
    app.get('/recibo', recibo.findAll);

    // Retrieve a single Receipt with receiptId
    app.get('/recibo/:reciboId', recibo.findOne);

    // Update a Receipt with receiptId
    app.put('/recibo/:reciboId', recibo.update);

    // Delete a Receipt with receiptId
    app.delete('/recibo/:reciboId', recibo.delete);
}