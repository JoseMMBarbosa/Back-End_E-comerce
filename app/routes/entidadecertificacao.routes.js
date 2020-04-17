module.exports = (app) => {
    const categoria = require('../controllers/entidadecertificacao.controller.js');

    // Create a new Entity
    app.post('/entidadecertificacao', categoria.create);

    // Retrieve all Entity
    app.get('/entidadecertificacao', categoria.findAll);

    app.post('/entidadecertificacao/deleteOne', categoria.deleteOne);

    // Retrieve a single Entity with EntityId
    app.get('/entidadecertificacao/:categoriaId', categoria.findOne);

    // Update a Entity with EntityId
    app.put('/entidadecertificacao/:categoriaId', categoria.update);

    // Delete a Entity with EntityId
    app.delete('/entidadecertificacao/:categoriaId', categoria.delete);
}