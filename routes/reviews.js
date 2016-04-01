var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Review = mongoose.model('Review');

router.get('/:id', function(req, res, next) {
	Review.findOne({_id : req.params.id}, function(err, review) {
		if (err) {
			return next(err);
		}
		res.json(review);
	});
});

router.get('/', function(req, res, next) {
	Review.find(function(err, reviews) {
		if (err) {
			return next(err);
		}
		res.json(reviews);
	});
});

router.post('/', function(req, res, next) {
  var review = new Review(req.body);

  review.save(function(err, review){
    if(err){ return next(err); }

    res.json(review);
  });
});

module.exports = router;
