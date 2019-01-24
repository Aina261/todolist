todoController = require('../controllers/todoController');

module.exports = (server) => {
    server.get('/todo/:id', todoController.getTodo);
    server.put('/todo/:id', todoController.updateTodo);
    server.delete('/todo/:id', todoController.deleteTodo);
};