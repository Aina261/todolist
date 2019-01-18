todoController = require('../controllers/todoController');

module.exports = (server) => {
    server.get('/todo', todoController.getTodos);
    server.get('/todo/:id', todoController.getTodo);
    server.post('/todo', todoController.createTodo);
    server.put('/todo/:id', todoController.updateTodo);
    server.delete('/todo/:id', todoController.deleteTodo);
};