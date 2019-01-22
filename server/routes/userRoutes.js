userController = require('../controllers/userController');

module.exports = (server) => {
    server.get('/user', userController.getUserName);
    server.get('/user/;id', userController.login);
    server.post('/user', userController.register);
    server.put('/user/:id', userController.updateUserTodo);

    server.get('/user-todo', userController.getUserAndTodo);
};