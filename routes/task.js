var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get("/:usrid/:id", function(req, res) {
   usersModel.findById(req.params.usrid, function (err, user) {
      if(err) res.send(err);
         else
         res.render('task',{usr: user, id: req.params.id}) 
   })
});

/*UPDATE request*/
router.put("/:usrid/:id", function (req, res) {
   var usrID = req.params.usrid
   var tskID = req.params.id
   var newTask = {
      title: req.body.title,
      completed: req.body.status
   }

   usersModel.findById(usrID, function (err, user) {
      if (err) console.log(err)
         else {
            user.tasks.forEach(task => {
               if (task._id == tskID) {
                  task.title = newTask.title
                  task.completed = newTask.completed
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
   var tskID = req.params.id

   usersModel.findById(usrID, function (err, user) {
      if (err) console.log(err)
      else {
         var newTasks = user.tasks.filter(task => {
            return task._id != tskID
         })
         user.tasks = newTasks
         user.save(function (err) {
            if (err) console.log(err)
            res.redirect('/')      
         })
      }
   })
})
module.exports = router;
