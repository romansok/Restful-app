var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('addUsr');
});

router.post('/', function (req,res) {
  usersModel.users.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else {
      console.log(req.body)
      var newUsr = {
        id: count + 1,
        name: req.body.name,
        email: req.body.email,
        address: {city: req.body.city},
        phone: 'NA'
      }
      usersModel.users.create(newUsr, function (err, created) {
        if (err) {
        console.log(err);
        } else {
            console.log(created);
          res.redirect("/")
        }
      })
    }    
  })
})

  

module.exports = router;
