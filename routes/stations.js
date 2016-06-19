var express = require('express');
var router = express.Router();

var auth = require('../utils/authentication');
var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');
var User = mongoose.model('User');

// TODO ESSA PORRA DE ID ZOA OUTRAS URLS
// router.get('/:id', function(req, res, next) {
//     Station.findOne({
//         _id: req.params.id
//     }, 'name location reviews', function(err, station) {
//         if (err) {
//             return next(err);
//         }
//         res.json(station);
//     });
// });

router.get('/:id/reviews', auth.ensureAuthorized, function(req, res, next) {
    Station
        .findOne({
            _id: req.params.id
        }, 'reviews')
        .populate('reviews')
        .exec(function(err, stationWithoutUser) {
            Station.populate(stationWithoutUser, {
                    path: 'reviews.user',
                    model: 'User',
                    select: 'name -_id'
                },
                function(err, station) {
                    if (err) return next(err);
                    User.findOne({
                        token: req.token
                    }, function(err, user) {
                        if (err) {
                            res.json({
                                station: station,
                                hasComment: false
                            });
                        } else {
                            Review.find({
                                    user: user._id,
                                    station: req.params.id
                                })
                                .exec(function(err, reviews) {
                                    var result = {
                                        station: station,
                                        hasComment: reviews.length > 0
                                    };
                                    if (err) {
                                        result.hasComment = false;
                                    }
                                    res.json(result);
                                });
                        }
                    });
                });
        });
});

router.post('/:id/reviews', auth.ensureAuthorized, function(req, res, next) {
    Station.findOne({
        _id: req.params.id
    }, function(err, station) {
        if (err) {
            return next(err);
        }
        User.findOne({
            token: req.token
        }, function(err, user) {
            if (err) {
                console.log('Não encontrou o usuário');
            } else {
                var review = new Review(req.body);
                station.reviews.push(review);
                review.user = user._id;
                review.station = station;
                review.save(function(err, review) {});
                station.save(function(err, station) {
                    if (err) {
                        return next(err);
                    }
                    res.json({
                        message: 'Avaliação adicionada com sucesso!'
                    });
                });
            }
        });
    });
});

// router.get('/', function(req, res, next) {
//     Station.find({
//         pending: false
//     }, function(err, stations) {
//         if (err) {
//             return next(err);
//         }
//         res.json(stations);
//     });
// });

router.get('/', function(req, res, next) {
    var order = {};
    var filter = {};
    var name = req.query.name;
    filter.pending = false;
    if (name) {
        var regex = '.*' + name + '.*';
        filter.name = new RegExp(regex);
    }
    var location = req.query.location;
    if (location) {
        var regex = '.*' + location + '.*';
        filter.location = new RegExp(regex);
    }
    var o = req.query.o;
    if (o) {
        if (o === 'name') {
            order.name = 'asc';
        } else if (o === 'average') {
            order.scoreAverage = 'desc';
        }
    }
    Station.find(filter, function(err, stations) {
        if (err) {
            return next(err);
        }
        res.json(stations);
    }).sort(order);
});

router.get('/pendings/', function(req, res, next) {
    Station.find({
        pending: true
    }, function(err, stations) {
        if (err) {
            return next(err);
        }
        res.json(stations);
    }).sort({
        createdAt: 1
    });
});

router.post('/', function(req, res, next) {
    var station = new Station(req.body);

    station.save(function(err, station) {
        if (err) {
            return next(err);
        }

        res.json(station);
    });
});

router.delete('/:id', function(req, res, next) {
    Station.remove({
        _id: req.params.id
    }, function(err, station) {
        if (err) {
            return next(err);
        }

        res.json(station);
    });
});

router.put('/:id', function(req, res, next) {
    var station = new Station(req.body);
    Station.findOneAndUpdate({
        _id: req.params.id
    }, station, {
        upsert: true
    }, function(err, station) {
        if (err) {
            return next(err);
        }
        res.json(station);
    });
});

module.exports = router;
