module.exports = (app) => {
    const loteproduto = require('../controllers/loteproduto.controller.js');

    // Create a new Lot
    app.post('/loteproduto', loteproduto.create);

    // Retrieve all Lots
    app.get('/loteproduto', loteproduto.findAll);

    app.post('/loteproduto/deleteOne', loteproduto.deleteOne);

    app.post('/loteproduto/produtorProdutor', loteproduto.produtorProdutor);

    app.put('/loteproduto/updateProduto', loteproduto.updateProduto);

    app.post('/loteproduto/tipoProduto', loteproduto.produtoTipoProduto);
    
    app.post('/loteproduto/nome', loteproduto.produtoNome);   

    // Retrieve a single Lot with LotId
    app.get('/loteproduto/:loteprodutoId', loteproduto.findOne);

    // Update a Lot with LotId
    app.put('/loteproduto/:loteprodutoId', loteproduto.update);

    // Delete a Lot with LotId
    app.delete('/loteproduto/:loteprodutoId', loteproduto.delete);
}