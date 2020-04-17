module.exports = (app) => {
    const qualificacao = require('../controllers/qualificacao.controller.js');

    // Create a new Qualification
    app.post('/qualificacao', qualificacao.create);

    // Retrieve all Qualification
    app.get('/qualificacao', qualificacao.findAll);

    app.post('/qualificacao/deleteOne', qualificacao.deleteOne);

    // Retrieve a single Qualification with qualificationId
    app.get('/qualificacao/:qualificacaoId', qualificacao.findOne);

    // Update a Qualification with qualificationId
    app.put('/qualificacao/:qualificacaoId', qualificacao.update);

    // Delete a Qualification with qualificationId
    app.delete('/qualificacao/:qualificacaoId', qualificacao.delete);
}