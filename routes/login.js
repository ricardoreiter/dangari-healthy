var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
	User.findOne({login : req.body.login, password: req.body.password}, function(err, user) {
		if (err) {
            res.status(500).send("Error occured: " + err);
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
            	res.status(500).send('Incorrect login/password');
            }
        }
	});
});

module.exports = router;
