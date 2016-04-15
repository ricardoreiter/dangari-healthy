var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/:id', function(req, res, next) {
	User.findOne({_id : req.params.id}, 'name login accountLevel', function(err, user) {
		if (err) {
			return next(err);
		}
		res.json(user);
	});
});

// TODO: essa rota só deveria retornar o name e accountLevel
router.get('/', function(req, res, next) {
	User.find('name accountLevel', function(err, users) {
		if (err) {
			return next(err);
		}
		res.json(users);
	});
});

router.post('/', function(req, res, next) {
  var user = new User(req.body);
  user.accountLevel = 0;

  if (!user.login) {
  	res.status(500).send('Empty user login');
  	return;
  }

  if (!user.password) {
  	res.status(500).send('Empty user password');
  	return;
  }

  if (!user.name) {
  	res.status(500).send('Empty user name');
  	return;
  }

  User.findOne({login : req.body.login}, 'name login accountLevel', function(err, userExists) {
		if (err) {
			return next(err);
		}
		if (userExists) {
			res.status(500).send('User already exists');
		} else {
			user.save(function(err, salvedUser){
			    if(err){ return next(err); }

			    res.json(salvedUser);
			});
		}
	});
});

module.exports = router;
