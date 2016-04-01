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

  user.save(function(err, user){
    if(err){ return next(err); }

    res.json(user);
  });
});

module.exports = router;
