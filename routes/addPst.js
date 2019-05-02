var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/:id', function(req, res) {
  res.render('addPst', {id: req.params.id})
});

/* POST request for new post*/
router.post('/:id', function (req,res) {
  usersModel.findById( req.params.id, function (err, user) {
    if (err) console.log(err)
    var newPst = {
      userId: req.params.id,
      title: req.body.title,
      body: req.body.body
    }
    user.posts.push(newPst);
    user.save(function (err, created) {
      if (err) console.log(err)
      else
        console.log("new post added for " + user.name)
        res.redirect('/')
    })
  }) 
  
})


module.exports = router;
