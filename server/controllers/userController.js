const User = require('../models/UserModel');
const Todo = require('../models/todoModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {

    // ======================================
    //           REGISTER USER
    // ======================================
    register(req, res) {
        // Check if userName or email was already use
        User.findOne({
            $or: [{email: req.body.email}, {userName: req.body.userName}]
        }).then(user => {
            if (!user) {
                const {userName} = req.body;
                const {email} = req.body;
                const passwordClear = req.body.password;
                const password = bcrypt.hashSync(passwordClear, saltRounds);
                const todo = [];

                const user = new User({
                    userName,
                    email,
                    password,
                    todo
                });

                user.save()
                    .then(() => {
                        res.send({
                            "userCreate": true
                        })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.send({
                    "userCreate": false
                })
            }
        });
    },


    // ======================================
    //              LOGIN USER
    // ======================================
    login(req, res) {
        const {userName} = req.body;
        const {password} = req.body;

        User.findOne({ userName: userName })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const payload = {
                            id: user._id,
                            userName: user.userName,
                            email: user.email
                        };
                        let token = jwt.sign(payload, 'secretKey', {expiresIn: 100000});
                        res.send({
                            "userLogin": true,
                            "user": {
                                _id: user._id,
                                userName: user.userName,
                                email: user.email
                            },
                            token
                        })
                    } else {
                        res.send({"userLogin": false, "error": "Bad password"})
                    }
                } else {
                    res.send({"userLogin": false, "error": "Bad user name"})
                }
            })
    },


    // ======================================
    //      UPDATE USER WITH TO\DO ID
    // ======================================
    updateUserTodo(req, res) {
        const {id} = req.params;

        User.findOne({_id: id})
            .then(user => {
                const {name} = req.body.todo[0];
                const {due_date} = req.body.todo[0];

                const todo = new Todo({
                    name,
                    due_date,
                });
                user.todo.push(todo);

                user.save().then(() => {
                    todo.save().then(() => {
                        res.send('Todo ' + todo.name + ' added to user ' + user.userName)
                    })
                })
            })
    },


    // ======================================
    //            GET USERNAME
    // ======================================
    getUserName(req, res) {
        User.find()
            .then((users) => {
                res.json(users)
            })
            .catch(err => {
                res.send(err)
            })
    },


    // ======================================
    //        GET USER AND TO\DO
    // ======================================
    getUserAndTodo(req, res) {
        User.aggregate([
            {$unwind: "$todo"},
            {
                $lookup: {
                    from: "TODO_COLLECTION",
                    localField: "todo",
                    foreignField: "_id",
                    as: "todoContent"
                }
            },
            {$unwind: "$todoContent"},
            {$sort: {"todoContent.due_date": 1}}
        ])
            .then( (userTodo) => {
                res.send(userTodo);
            } )
    }
};