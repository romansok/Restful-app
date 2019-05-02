var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');




/* GET home page. */
router.get('/', function(req, res) {
   usersModel.find({}, function(err, usr) {
      if(err) res.send(err);
         else {
            res.render('index', {usersData: usr })
         }
   })
})


/*
users.getUserId(userId).then(usrList => {
   res.render("userData", {det : usrList});
   })
*/
module.exports = router;
