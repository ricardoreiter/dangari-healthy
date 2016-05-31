var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  	name: String,
  	login: String,
    token: String,
    email: String,
  	password: String,
  	accountLevel: Number
});

mongoose.model('User', UserSchema);
