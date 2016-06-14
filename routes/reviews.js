var express = require('express');
var router = express.Router();

var auth = require('../utils/authentication');
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var User = mongoose.model('User');

router.put('/:id/complaint', auth.ensureAuthorized, function(req, res, next) {
	Review.findOne({_id : req.params.id}, function(err, review) {
		if (err) {
			return next(err);
		}
		User.findOne({
            token: req.token
        }, function(err, user) {
            if (err) {
				return next(err);
			}
        	review.complaints.push(user);
        	review.save(function(err, review) {
                if (err) {
                    return next(err);
                }
                res.json({
                    message: 'Denúncia registrada com sucesso!'
                });
            });
        });
	});
});

router.delete('/:id/complaint', auth.ensureAuthorized, function(req, res, next) {
    Review.findOne({_id : req.params.id}, function(err, review) {
        if (err) {
            return next(err);
        }
        User.findOne({
            token: req.token
        }, function(err, user) {
            if (err) {
                return next(err);
            }

            if (!user.isAdmin) {
                res.status(403).send('Access denied');
            } else {
                review.complaints = [];
                review.save(function(err, review) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        message: 'Denúncias removidas com sucesso!'
                    });
                });
            }
        });
    });
});

router.get('/', function(req, res, next) {
    var withComplaint = req.query.withComplaint;

    if (!!withComplaint) {
        console.log("wiht");
        Review.find({
                    complaints : { $gt: [] }
                })
                .populate('user', 'name')
                .populate('station', 'name')
                .exec(function(err, reviews) {
                    if (err) {
                        return next(err);
                    }
                    res.json(reviews);
                });
    } else {
    	Review.find(function(err, reviews) {
    		if (err) {
    			return next(err);
    		}
    		res.json(reviews);
    	});
    }
});

router.post('/', function(req, res, next) {
  var review = new Review(req.body);

  review.save(function(err, review){
    if(err){ return next(err); }

    res.json(review);
  });
});

module.exports = router;
