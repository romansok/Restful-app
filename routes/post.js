var express = require('express');
var router = express.Router();
var posts = require('../models/posts');

/* GET users listing. */
router.get("/:id", function(req, res) {
   var pstId = req.params.id;
   posts.find({}, function (err, pstData) {
      if(err) res.send(err);
      else {
         res.render("post", {det: pstData, id: pstId});         
      }      
   })
});

router.put("/:id", function (req, res) {
   var pstId = req.params.id;
   var newPost =  {
      title: req.body.title,
      body: req.body.body
   }

   posts.findByIdAndUpdate(pstId, newPost, function (err, pst) {
      console.log("post no. " + pst.id + " Updated!!!");
      res.redirect('/');
   })
})

router.delete("/:id", function (req, res) {
   var pstId = req.params.id;

   posts.findByIdAndDelete(pstId, function (err, pst) {
      console.log("post no. " + pst.id + " Deleted!!!");
      res.redirect('/');
   })

   
})

module.exports = router;
