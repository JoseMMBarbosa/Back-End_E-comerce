module.exports = (app) => {
    const local = require('../controllers/local.controller.js');

    // Create a new Place
    app.post('/local', local.create);

    // Retrieve all Places
    app.get('/local', local.findAll);

    app.post('/local/deleteOne', local.deleteOne);

    // Retrieve a single Place with PlaceId
    app.get('/local/:localId', local.findOne);

    // Update a Place with PlaceId
    app.put('/local/:localId', local.update);

    // Delete a Place with PlaceId
    app.delete('/local/:localId', local.delete);
}