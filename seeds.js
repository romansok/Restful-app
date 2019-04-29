var mongoose = require("mongoose");
var axios = require('axios');
var posts = require('./models/posts');
var users = require('./models/users');
var tasks = require('./models/tasks');

/* todo
seed files
*/



exports.seedDB = function() {

  users.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else if(!count)
    {
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then(usersData => {
         usersData.data.forEach(user => {
          users.create(user, (err, usr) =>{
            if (err){
                console.log(err)
            }else{
                console.log(usr)
            } 
          })
         })
        
        });
    }
  });
  
  tasks.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else if(!count)
    {
      axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(tasksData => {
          tasksData.data.forEach(task => {
          tasks.create(task, (err, tsk) =>{
            if (err){
                console.log(err)
            }else{
                console.log(tsk)
            } 
          })
         })
        
        });
    }
  });
  
  
  posts.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else if(!count)
    {
      axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(postsData => {
          postsData.data.forEach(post => {
          posts.create(post, (err, pst) =>{
            if (err){
                console.log(err)
            }else{
                console.log(pst)
            } 
          })
         })
        
        });
    }
  });
  
}



/*
usersDB.countDocuments({}, function (err, count) {
    if (err) console.log(err)
    else if(!count)
    {
      users.initDB();
    }
  });



  var axios = require("axios");
var json = require('jsonfile');
var usersDB = require('../models/userDBmodel');



exports.initDB = function() {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(usersData => {
       usersData.data.map(user => {
        usersDB.create({
          name : user.name,
          email : user.email,
          city : user.address.city,
          phone : user.phone
        }, (err, usr) =>{
          if (err){
              console.log(err)
          }else{
              console.log(usr)
          } 
        })
       })
      
      });

};


*/