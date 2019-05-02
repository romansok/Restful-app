var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postsSchema = new Schema({

   userId : Schema.ObjectId,
   title: String,
   body: String   
});

var tasksSchema = new Schema({

   userId : Schema.ObjectId,
   title: String,
   completed: Boolean
});

var phonesSchema = new Schema({

   userID : Schema.ObjectId,
   phoneType : String,
   phoneNumber : String
});


var userSchema = new Schema({

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
   website: String,
   company: {
      name: String,
      catchPhrase: String,
      bs: String
   },
   posts: [postsSchema],
   tasks: [tasksSchema],
   phones: [phonesSchema]
});

   
module.exports = mongoose.model("users" , userSchema);




