const Todo = require('../models/todoModel');
const User = require('../models/UserModel');

module.exports = {

    // ======================================
    //              GET TODOS
    // ======================================
    getTodos(req, res) {
        Todo.find()
            .sort({due_date: 'asc'})
            .then((todos) => {
                res.json(todos)
            })
            .catch(err => {
                res.send(err)
            })
    },


    // ======================================
    //          GET TASK BY ID
    // ======================================
    getTodo(req, res) {
        const {id} = req.params;
        Todo.findById({_id: id})
            .then(todo => {
                res.send(todo)
            })
            .catch(err => {
                res.send(err)
            })
    },


    // ======================================
    //              CREATE TASK
    // ======================================
    createTodo(req, res) {
        const {name} = req.body;
        const {due_date} = req.body;

        const todo = new Todo({
            name,
            due_date
        });

        todo.save()
            .then(() => {
                res.send(todo)
            })
            .catch(err => {
                res.send(err)
            })
    },


    // ======================================
    //          UDPATE TASK BY ID
    // ======================================
    updateTodo(req, res) {
        const {id} = req.params;
        const {name} = req.body;
        const {completed} = req.body;
        Todo.findByIdAndUpdate(id, {name, completed})
            .then((todo) => {
                res.send({success: true, request: "update", todo})
            })
            .catch(err => {
                res.send(err)
            })
    },


    // ======================================
    //          DELETE TASK BY ID
    // ======================================
    deleteTodo(req, res) {
        const {id} = req.params;

        Todo.findOne({_id: id})
            .then(todo => {
                User.findOne({todo: todo})
                    .then(user => {
                        const todoIndex = user.todo.indexOf(todo._id);
                        user.todo.splice(todoIndex, 1);

                        user.save().then( () => {
                            Todo.findOneAndDelete({_id: id})
                                .then(() => {
                                    res.send({success: true, request: "delete"})
                                })
                                .catch(err => {
                                    res.send(err)
                                })
                        })
                    })
            })
    },


};