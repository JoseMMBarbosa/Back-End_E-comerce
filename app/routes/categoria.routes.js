module.exports = (app) => {
    const categoria = require('../controllers/categoria.controller.js');

    // Create a new Category
    app.post('/categoria', categoria.create);

    // Retrieve all Category
    app.get('/categoria', categoria.findAll);


    app.post('/categoria/deleteOne', categoria.deleteOne);

    // Retrieve a single Category with CategoryId
    app.get('/categoria/:categoriaId', categoria.findOne);

    // Update a Category with categoryId
    app.put('/categoria/:categoriaId', categoria.update);

    // Delete a Category with categoryId
    app.delete('/categoria/:categoriaId', categoria.delete);
}