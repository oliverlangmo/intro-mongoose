var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//require model
var User = require('../models/user');

// get the express app
var app = express();

//connect to the database - userDb is the database name
mongoose.connect('mongodb://localhost:27017/userDb');

//parse json
app.use(bodyParser.json());

//dummy-value get route. Dummy value meaning
//'hard coded' Millie
app.get('/millie', function(req, res) {
  var millie = new User({
    name: 'Millie',
    username: 'millie11',
    password: 'reallybadpassword'
  });

  millie.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('User saved successfully!');
      res.sendStatus(200);
    }
  });
});//end millie get route

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
//update millie route
app.put('/updateMillie', function(req, res) {
  console.log('hit put route - updateMillie');

  //Hard coded to find one user with name Millie
  User.findOne({name: 'Millie'}, function(err, userResult) {
    console.log('find user result = ', userResult);

    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      userResult.name = "Millie Walsh";
      userResult.admin = false;

      userResult.save(function(err) {
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          console.log('Update user = ', userResult._id);
          res.sendStatus(200);
          /**
            Thought: What do you want your API to return.
            Just a status code? The updated user object?
            Or the userResult._id? res.send(userResult);
          **/
        }
      });
    }
  });
}); //end update Millie route

/**
  Thought: How could you make this route delete any user?
  It will need to take something to uniquely identify the user.
  This should be passed in the URL. For ex: localhost:3000/delete/<id>
**/
// delete Millie route
app.delete('/deleteMillie', function(req, res) {
  console.log('delete route');

  User.findOne({username: 'millie11'}, function(err, userResult) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      User.remove({_id: userResult._id}, function(err) {});
      res.sendStatus(200);
    }
  });
});// end delete route

// server listen
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port ', port);
});
