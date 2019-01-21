userController = require('../controllers/userController');

module.exports = (server) => {
    server.get('/users', userController.getUserName);
    server.get('/user', userController.login);
    server.post('/user', userController.register);

};