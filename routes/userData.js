var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/*GET request*/
router.get("/:id", function(req, res) {
  var userId = req.params.id;
  usersModel.users.find({}, function (err, usrData) {
     if(err) res.send(err);
     else {
        res.render("userData", {det: usrData, id: userId});         
     }      
  })
});

/*UPDATE request*/
router.put("/:id", function (req, res) {
   var usrId = req.params.id;

   usersModel.users.findOneAndUpdate({id: usrId}, {
      name: req.body.name,
      email: req.body.email,
      address: {city: req.body.city},
      phone: req.body.city

   }, function (err) {
      if (err) console.log(err)
      else {         
         res.redirect('/');
      }
   })
}) 

/*DELETE request*/
router.delete("/:id", function (req, res) {
   var usrId = req.params.id;

   usersModel.users.findOneAndDelete({id: usrId}, function (err) {
      if (err) console.log(err)
      else {         
         res.redirect('/');
      }
   })
})

module.exports = router;
