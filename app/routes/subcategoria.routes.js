module.exports = (app) => {
    const subcategoria = require('../controllers/subcategoria.controller.js');

    // Create a new subcategory
    app.post('/subcategoria', subcategoria.create);

    // Retrieve all subcategories
    app.get('/subcategoria', subcategoria.findAll);

    app.post('/subcategoria/deleteOne', subcategoria.deleteOne);

    // Retrieve a single subcategory with subcategoryId
    app.get('/subcategoria/:subcategoriaId', subcategoria.findOne);

    // Update a subcategory with subcategoryId
    app.put('/subcategoria/:subcategoriaId', subcategoria.update);

    // Delete a subcategory with subcategoryId
    app.delete('/subcategoria/:subcategoriaId', subcategoria.delete);
}