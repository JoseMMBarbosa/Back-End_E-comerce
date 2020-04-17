module.exports = (app) => {
    const tipoproduto = require('../controllers/tipoproduto.controller.js');

    // Create a new Product Type
    app.post('/tipoProduto', tipoproduto.create);

    // Retrieve all Product Types
    app.get('/tipoProduto', tipoproduto.findAll);

    app.post('/tipoProduto/deleteOne', tipoproduto.deleteOne);

    // Retrieve a single Product Type with producttypeId
    app.get('/tipoproduto/:tipoprodutoId', tipoproduto.findOne);

    // Update a Product Type with producttypeId
    app.put('/tipoproduto/:tipoprodutoId', tipoproduto.update);

    // Delete a Product Type with producttypeId
    app.delete('/tipoproduto/:tipoprodutoId', tipoproduto.delete);
}