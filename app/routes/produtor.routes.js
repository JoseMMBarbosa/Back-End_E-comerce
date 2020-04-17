module.exports = (app) => {
    const produtor = require('../controllers/produtor.controller.js');

    // Create a new Producer
    app.post('/produtor', produtor.create);

    // Retrieve all Producers
    app.get('/produtor', produtor.findAll);

    app.post('/produtor/deleteOne', produtor.deleteOne);

    app.put('/produtor/updadeProdutor', produtor.updateProdutor);

    // Retrieve a single Producer with ProducerId
    app.get('/produtor/:produtorId', produtor.findOne);

    // Update a Producer with ProducerId
    app.put('/produtor/:produtorId', produtor.update);

    // Delete a Producer with ProducerId
    app.delete('/produtor/:produtorId', produtor.delete);
}