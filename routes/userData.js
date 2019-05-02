var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/*GET request*/
router.get("/:id", function(req, res) {
  var userId = req.params.id;
  usersModel.findById(userId, function (err, user) {
     if (err) console.log(err)
     else 
      res.render('userData', {usr: user})
  })
});

/*UPDATE request*/
router.put("/:id", function (req, res) {
   var usrId = req.params.id;

   usersModel.findByIdAndUpdate(usrId, {
      name: req.body.name,
      email: req.body.email,
      address: {city: req.body.city},
   }, function (err, updUsr) {
      if (err) console.log(err)
      else {
         if (req.body.phone != ""){
            var newPhone = {
               userID : usrId,
               phoneType : req.body.phoneType,
               phoneNumber : req.body.phone
            }
            updUsr.phones.push(newPhone)
            
         }
         updUsr.save(function (err) {
            if (err) console.log(err)

            console.log("user " + updUsr.name + " updated")         
            res.redirect('/');
         })
      }
   })
})  

/*DELETE request*/
router.delete("/:id", function (req, res) {
   var usrId = req.params.id;

   usersModel.findByIdAndDelete(usrId, function (err) {
      if (err) console.log(err)
      else {
         console.log("user deleted")         
         res.redirect('/');
      }
   })
})

module.exports = router;
