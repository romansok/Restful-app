var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
   }
});

module.exports = mongoose.model('users',userSchema);




