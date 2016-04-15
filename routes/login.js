var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
	User.findOne({login : req.body.login}, 'name login accountLevel', function(err, user) {
		if (err) {
			return next(err);
		}
		res.json(user);
	});
});

module.exports = router;
