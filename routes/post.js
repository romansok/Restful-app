var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get("/:id", function(req, res) {
   var pstId = req.params.id;
   usersModel.posts.find({}, function (err, pstData) {
      if(err) res.send(err);
      else {
         res.render("post", {det: pstData, id: pstId});         
      }      
   })
});

/*UPDATE request*/
router.put("/:id", function (req, res) {
   var pstId = req.params.id;
   var newPost = {
      title: req.body.title,
      body: req.body.body
   }

   usersModel.posts.findByIdAndUpdate(pstId, newPost, function (err, updatedPst) {
      if (err) console.log(err)
      else {
         usersModel.users.findOne({id: updatedPst.userId}, function (err, usrToUpdate) {
            if (err) console.log(err)

            usrToUpdate.posts.forEach(usrPst => {
               if(updatedPst.id == usrPst.id) {
                  usrPst.title = newPost.title
                  usrPst.body = newPost.body
                  usrToUpdate.save(function (err) {
                     if (err) console.log(err)
                     res.redirect('/');
               })                      
            }
         })
        })
      }
   })
})

/*DELETE request*/
router.delete("/:id", function (req, res) {
   var pstId = req.params.id;

   usersModel.posts.findByIdAndDelete(pstId, function (err, pst) {
      if (err) console.log(err)
      else {
         usersModel.users.findOne({id: pst.userId}, function (err, usrToUpdate) {
            var newPosts = usrToUpdate.posts.filter(usrPst => {
               return usrPst.id !=  pst.id
               })
            usrToUpdate.posts = newPosts
            usrToUpdate.save(function (err) {
               if (err) console.log(err)
               res.redirect('/');
               })
                  
         })
      }   
   })
})

module.exports = router;
