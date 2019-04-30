var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');




/* GET home page. */
router.get('/', function(req, res) {
   usersModel.users.find({}, function(err, usr) {
      if(err) res.send(err);
         else {
            res.render('index', {usersData: usr })
            /*
            posts.find({}, function (req, posts) {
               if(err) res.send(err);
               else {
                  tasks.find({}, function (req,tasks) {
                   if (err) res.send (err);
                     else {
                        res.render('index',{usrData: pers, pstData: posts, tskData: tasks })
                   }
                  })
               }
         })*/
      }
   })
})


/*
users.getUserId(userId).then(usrList => {
   res.render("userData", {det : usrList});
   })
*/
module.exports = router;
