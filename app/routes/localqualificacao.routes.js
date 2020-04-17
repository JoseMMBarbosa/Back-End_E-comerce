module.exports = (app) => {
    const localqualificacao = require('../controllers/localqualificacao.controller.js');

    // Create a new PlaceQualification
    app.post('/localqualificacao', localqualificacao.create);

    // Retrieve all PlaceQualification
    app.get('/localqualificacao', localqualificacao.findAll);

    // Retrieve a single PlaceQualification with PlaceQualificationId
    app.get('/localqualificacao/:localqualificacaoId', localqualificacao.findOne);

    // Update a PlaceQualification with PlaceQualificationId
    app.put('/localqualificacao/:localqualificacaoId', localqualificacao.update);

    // Delete a PlaceQualification with PlaceQualificationId
    app.delete('/localqualificacao/:localqualificacaoId', localqualificacao.delete);
}