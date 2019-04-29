var express = require('express');
var router = express.Router();

var users = require('../models/users')

router.get("/:id", function(req, res) {
  var userId = req.params.id;
  users.find({}, function (err, usrData) {
     if(err) res.send(err);
     else {
        res.render("userData", {det: usrData, id: userId});         
     }      
  })
});
/*router.get("/:id", function(req, res) {
    var userId = req.params.id;
    users.getUserId(userId).then(usrList => {
    res.render("userData", {det : usrList});
  })
  });*/

module.exports = router;
