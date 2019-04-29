var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tasksSchema = new Schema({

    userId : Number,
    id: Number,
    title: String,
    completed: Boolean
 });


module.exports = mongoose.model('tasks',tasksSchema)
