var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var phonesSchema = new Schema({//to edit the scheme content

   userID : Number,
   phoneType : String,
   phoneNumber : String,
});

  
module.exports = mongoose.model('phones',phonesSchema)




