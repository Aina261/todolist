const User = require('../models/UserModel');
const Todo = require('../models/todoModel');
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

                console.log(password);

                const user = new User({
                    userName,
                    email,
                    password,
                    todo
                });

                user.save()
                    .then(() => {
                        res.status(200).json({
                            "userCreate": true
                        })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            } else {
                res.status(403).json({
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

        User.findOne({
            userName: userName
        })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        res.status(200).json({
                            "userLogin": true,
                            user
                        })
                    } else {
                        res.send({"userLogin": false})
                    }
                } else {
                    res.send({"userLogin": false})
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
                        res.send('Todo added to user ' + user)
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