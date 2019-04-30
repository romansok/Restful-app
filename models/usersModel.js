var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postsSchema = new Schema({

   userId : Number,
   id: Number,
   title: String,
   body: String   
});

var tasksSchema = new Schema({

   userId : Number,
   id: Number,
   title: String,
   completed: Boolean
});

var userSchema = new Schema({

   id: Number,
   name: String,
   username: String,
   email: String,
   address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo: {
         lat: String,
         lng: String,
      }
   },
   phone: String,
   website: String,
   company: {
      name: String,
      catchPhrase: String,
      bs: String
   },
   posts: [postsSchema],
   tasks: [tasksSchema]
});

var users = mongoose.model("users" , userSchema);
var posts = mongoose.model("posts" , postsSchema);
var tasks = mongoose.model("tasks" , tasksSchema);

var usersModel = {
   users,
   posts,
   tasks,
}
module.exports = usersModel;




