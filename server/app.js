var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var millie = require('../routes/millie');

//require model
var User = require('../models/user');

// get the express app
var app = express();

//connect to the database - userDb is the database name
mongoose.connect('mongodb://localhost:27017/usersDb');

//parse json
app.use(bodyParser.json());

//dummy-value get route. Dummy value meaning
//'hard coded' Millie


app.use('/millie', millie);

//get all users
app.get('/all', function(req, res) {
  User.find({}, function(err, usersList) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(usersList);
    }
  });
}); //end get all users

// create route
app.post('/create', function(req, res) {
  console.log('hit create route');
  console.log('req.body = ', req.body);

  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('User saved successfully!');
      res.sendStatus(200);
    }
  });
});

/**
  Thought: How could you make this route update any user?
  It will need to take something to uniquely id the user as
  well as the updated user object.
**/


// server listen
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port ', port);
});
