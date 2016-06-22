var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    photo: Buffer,
    login: String,
    token: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    banned: Boolean
}, {
    timestamps: true
});

mongoose.model('User', UserSchema);
