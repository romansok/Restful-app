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

router.post("/:id/update", function (req, res) {
   var pstId = req.params.id;
   posts.findByIdAndUpdate(pstId, {
      title: "bnei yehuda"
   }, function (err, pst) {
      console.log(pst);
      res.redirect('/');
   })
})

router.post("/:id/delete", function (req, res) {
   var pstId = req.params.id;
   
})

module.exports = router;
