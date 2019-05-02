var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('addUsr');
});

router.post('/', function (req,res) {
  var newUsr = {
    name: req.body.name,
    email: req.body.email,
    address: {city: req.body.city},
  }
  usersModel.create(newUsr, function (err, created) {
    if (err) console.log(err);
      else {
        console.log("new user:\n" + created);
        res.redirect("/")
      }
  })
})

  

module.exports = router;
