var express = require('express');
var router = express.Router();
var tasks = require('../models/tasks');

/* GET users listing. */
router.get("/:id", function(req, res) {
  var tskId = req.params.id;
  tasks.find({}, function (err, tskData) {
     if(err) res.send(err);
     else {
        res.render("task", {det: tskData, id: tskId});         
     }      
  })
});
module.exports = router;
