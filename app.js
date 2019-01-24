const mongoose = require('mongoose');
const express = require('express');
const todoRoutes = require('./server/routes/todoRoutes');
const userRoutes = require('./server/routes/userRoutes');
const reminder = require('./module/reminder');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();

// Allow cross domain
server.use(cors());

// Parse json request
server.use(bodyParser.json());
server.set('json spaces', 2); // Make json more readable

todoRoutes(server);
userRoutes(server);
reminder();

server.listen(3050, () => {
    console.log('App listen localhost:3050');
    mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true, })
        .then( () => { console.log('DB connexion established') })
        .catch(err => { console.log('DB connexion was not established : ' + err) });
});