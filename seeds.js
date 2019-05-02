var mongoose = require("mongoose");
var axios = require('axios');
var usersModel = require('./models/usersModel');

/* todo
seed files
*/

exports.seedDB = function() {
  getTasks().then(tasks => {
    getPosts().then(posts => {
      usersModel.countDocuments({}, function (err, count) {
        if (err) {
          console.log(err)
        }
        else if(!count) {
          getUsers().then(usersData => {
              usersData.data.forEach(user => {
                    usersModel.create(user, function (err, created) {
                      if (err) console.log(err)
                      else {
                        posts.data.forEach(pst =>{
                          if (user.id == pst.userId) {
                            var newPst = {
                              userId: created._id,
                              title: pst.title,
                              body: pst.body
                            }
                            created.posts.push(newPst)                            
                          }
                        })
                        tasks.data.forEach(tsk =>{
                          if (user.id == tsk.userId) {
                            var newTsk = {
                              userId: created._id,
                              title: tsk.title,
                              completed: tsk.completed
                            }
                            created.tasks.push(newTsk)  
                          }
                        })
                        var newPhone = {
                          userID : created._id,
                          phoneType : "office",
                          phoneNumber : user.phone
                        }
                        created.phones.push(newPhone)
                       
                        created.save(function (err) {
                          if (err) console.log(err)
                          else
                            console.log("seeds created")
                        })
                        
                      }
                    })                   
                  })              
              })
            }
        })
      })
    })
  }
  


function getPosts() {
  var prom = new Promise(resolve => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(data => resolve(data));
  });
  return prom;
}

function getTasks() {
  var prom = new Promise(resolve => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(data => resolve(data));
  });
  return prom;
}

function getUsers() {
  var prom = new Promise(resolve => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(data => resolve(data));
  });
  return prom;
}
