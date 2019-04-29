var express = require('express');
var router = express.Router();

var posts = require('../models/posts');
var users = require('../models/users');
var tasks = require('../models/tasks');



/* GET home page. */
router.get('/', function(req, res) {
   users.find({}, function(err,pers) {
      if(err) res.send(err);
       else {
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
         })
      }
   })
})


/*
users.getUserId(userId).then(usrList => {
   res.render("userData", {det : usrList});
   })
*/
module.exports = router;
