var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  	name: String,
  	login: String,
    token: String,
    email: String,
  	password: String,
  	isAdmin: Boolean
});

mongoose.model('User', UserSchema);
