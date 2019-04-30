var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get('/:id', function(req, res) {
res.render('addTsk', {id: req.params.id})
});

router.post('/:id', function (req,res) {
  tasks.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else {
      console.log(req.body)
      var newTsk = {
        userId: req.params.id,
        id: count + 1,
        title: req.body.title,
        completed: false
      }
      tasks.create(newTsk, function (err, created) {
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

module.exports = router;
