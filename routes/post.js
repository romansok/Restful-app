var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get("/:usrid/:id", function(req, res) {
   usersModel.findById(req.params.usrid, function (err, user) {
      if(err) res.send(err);
         else
         res.render('post',{usr: user, id: req.params.id}) 
   })
});

/*UPDATE request*/
router.put("/:usrid/:id", function (req, res) {
   var usrID = req.params.usrid
   var pstID = req.params.id
   var newPost = {
      title: req.body.title,
      body: req.body.body
   }
   usersModel.findById(usrID, function (err, user) {
      if (err) console.log(err)
      else {
         user.posts.forEach(post => {
            if (post._id == pstID) {
               post.title = newPost.title
               post.body = newPost.body
            }
         })
         user.save(function (err) {
            if (err) console.log(err)
            res.redirect('/')      
         })
      }
   }) 
})

/*DELETE request*/
router.delete("/:usrid/:id", function (req, res) {
   var usrID = req.params.usrid
   var pstID = req.params.id

   usersModel.findById(usrID, function (err, user) {
      if (err) console.log(err)
      else {
         var newPosts = user.posts.filter(post => {
            return post._id != pstID
         })
         user.posts = newPosts
         user.save(function (err) {
            if (err) console.log(err)
            res.redirect('/')      
         })
      }
   })
})

module.exports = router;
