/*var axios = require("axios");
var json = require('jsonfile');
var users = require('../models/usersModel')


exports.getUsers = function() {
  var prom = new Promise(resolve => {
    users.find({}, function(err, users){
      console.log(users);
      if (err) console.log(err)
      else{
        resolve()
      }
    })
    // axios.get("https://jsonplaceholder.typicode.com/users")
      .then(data => resolve(data));
  });

  return prom;
};

exports.getUserId = function(id) {
  var prom = new Promise(resolve => {
    axios.get("https://jsonplaceholder.typicode.com/users/").
    then(usersData => {
      var user = usersData.data.filter(u => (u.id == id));
      resolve(user);
    });
  });

  return prom; 
};
*/

