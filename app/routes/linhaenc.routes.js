module.exports = (app) => {
    const linhaenc = require('../controllers/linhaenc.controller.js');

    // Create a new Line
    app.post('/linhaenc', linhaenc.create);

    // Retrieve all Lines
    app.get('/linhaenc', linhaenc.findAll);

    app.post('/linhaenc/linhaProdutor', linhaenc.linhaProdutor);


    // Retrieve a single Line with LineId
    app.get('/linhaenc/:linhaencId', linhaenc.findOne);

    // Update a Line with LineId
    app.put('/linhaenc/:linhaencId', linhaenc.update);

    // Delete a Line with LineId
    app.delete('/linhaenc/:linhaencId', linhaenc.delete);
}