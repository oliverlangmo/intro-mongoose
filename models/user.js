var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: {type: String, unique: true},
  password: {type: String},
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// first param is the collection name
// second param is the schema you created above
// Reminder: mongo/mongoose will lowercase and pluralize for you.
var User = mongoose.model('users', userSchema);

module.exports = User;
