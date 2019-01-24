userController = require('../controllers/userController');

module.exports = (server) => {
    server.get('/user', userController.getUser);
    server.post('/login/user', userController.login);
    server.post('/user', userController.register);
    server.put('/user/:id', userController.updateUserTodo);

    server.get('/user-todo', userController.getUserAndTodo);
};