var express = require('express');
var router = express.Router();
var posts = require('../models/posts');

/* GET users listing. */
router.get('/:id', function(req, res) {
console.log(req.params.id)
res.render('addPst', {id: req.params.id})
});

router.post('/:id', function (req,res) {
  posts.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else {
      console.log(req.body)
      var newPst = {
        userId: req.params.id,
        id: count + 1,
        title: req.body.title,
        body: req.body.body
      }
      posts.create(newPst, function (err, created) {
        if (err) {
        console.log(err);
        } else {
          console.log(created);
          res.redirect("../")
        }
      })
    }    
  })
})

router.put('')

module.exports = router;
