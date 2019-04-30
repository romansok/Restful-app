var express = require('express');
var router = express.Router();
var usersModel = require('../models/usersModel');

/* GET users listing. */
router.get("/:id", function(req, res) {
  var tskId = req.params.id;
  usersModel.tasks.find({}, function (err, tskData) {
     if(err) res.send(err);
     else {
        res.render("task", {det: tskData, id: tskId});         
     }      
  })
});

/*UPDATE request*/
router.put("/:id", function (req, res) {
   var tskId = req.params.id;
   var newTask = {
      title: req.body.title,
      completed: req.body.status
   }

   usersModel.tasks.findByIdAndUpdate(tskId, newTask, function (err, updatedTsk) {
      if (err) console.log(err)
      else {
         usersModel.users.findOne({id: updatedTsk.userId}, function (err, usrToUpdate) {
            if (err) console.log(err)

            usrToUpdate.tasks.forEach(usrTsk => {
               if(updatedTsk.id == usrTsk.id) {
                  usrTsk.title = newTask.title
                  usrTsk.completed = newTask.completed
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
   var tskId = req.params.id;

   usersModel.tasks.findByIdAndDelete(tskId, function (err, tsk) {
      if (err) console.log(err)
      else {
         usersModel.users.findOne({id: tsk.userId}, function (err, usrToUpdate) {
            var newTasks = usrToUpdate.tasks.filter(usrTsk => {
               return usrTsk.id !=  tsk.id
               })
            usrToUpdate.tasks = newTasks
            usrToUpdate.save(function (err) {
               if (err) console.log(err)
               res.redirect('/');
               })
                  
         })
      }   
   })
})

module.exports = router;
