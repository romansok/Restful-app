var mongoose = require("mongoose");
var axios = require('axios');
var usersModel = require('./models/usersModel');


/* todo
seed files
*/



exports.seedDB = function() {
  seedTasks().then(tasks => {
    seedPosts().then(posts => {
      usersModel.users.countDocuments({}, function (err, count) {
        if (err) {
          console.log(err)
        }
        else if(!count) {
          getUsers()
            .then(usersData => {
              usersData.data.forEach(user => {
                usersModel.posts.find({userId: user.id}, function (err, userPosts) {
                  usersModel.tasks.find({userId: user.id}, function (err, userTasks) {
                    usersModel.users.create({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      address: {
                        city: user.address.city
                      } ,
                      phone: user.phone,
                      posts: userPosts,
                      tasks: userTasks

                    }), function (err, created) {
                      if (err) console.log(err)
                      else
                      console.log("users seeds created")
                    }                   
                  })
                })
              })
            });
        }
      });
    })
  })
}

function seedTasks() {
  var prom = new Promise(resolve => {

    usersModel.tasks.countDocuments({}, function (err, count) {
      if (err) console.log(err)
      else if(!count)
      {
        getTasks()
          .then(tasksData => {
            usersModel.tasks.insertMany(tasksData.data, function(err, newTasks){
              if (err)
                console.log(err)
                else {
                  console.log("tasks seeds created");
                  resolve(usersModel.tasks)
                }
            })
          })
        }
    })
  })
  return prom
}


function seedPosts() {
  var prom = new Promise(resolve => {

      usersModel.posts.countDocuments({}, function (err, count) {
        if (err) console.log(err)
        else if(!count)
        {
          getPosts()
            .then(postsData => {
              usersModel.posts.insertMany(postsData.data, function(err, newPosts){
                if (err)
                  console.log(err)
                  else {
                    resolve(usersModel.posts)
                    console.log("posts seeds created");
                  }
              })
            })
          }
      })

    })
      return prom
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

  
  /*posts
  function to get the posts
  then insert it to the posts collection
  */
 /*users

 

 
  

  



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