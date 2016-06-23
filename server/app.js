var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//require model
var User = require('../models/user');

var app = express();

mongoose.connect('mongodb://localhost:27017/userDb');

//parse json
app.use(bodyParser.json());

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
});

app.get('/all', function(req, res) {
  User.find({}, function(err, usersList) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(usersList);
    }
  });
});

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

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port ', port);
});
