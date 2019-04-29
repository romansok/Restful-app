
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postsSchema = new Schema({

    userId : Number,
    id: Number,
    title: String,
    body: String   
 });

module.exports = mongoose.model('posts',postsSchema)
 