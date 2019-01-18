const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: String,
    created_date: {type: Date, default: new Date()},
    due_date: Date,
    completed: {type: Boolean, default: false}
});

const Todo = mongoose.model('Todo', todoSchema, 'TODO_COLLECTION');
module.exports = Todo;