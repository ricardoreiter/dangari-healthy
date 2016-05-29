var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');

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

router.get('/:id/reviews', function(req, res, next) {
    Station
        .findOne({
            _id: req.params.id
        }, 'reviews')
        .populate('reviews')
        .exec(function(err, station) {
            if (err) return next(err);
            res.json(station);
        });
});

router.post('/:id/reviews', function(req, res, next) {
    Review.findOne({
        _id: req.body._id
    }, function(err, review) {
        if (err) {
            return next(err);
        }
        Station.findOne({
            _id: req.params.id
        }, function(err, station) {
            if (err) {
                return next(err);
            }
            station.reviews.push(review);
            station.save(function(err, station) {
                if (err) {
                    return next(err);
                }
                res.json({
                    message: 'Avaliação adicionada com sucesso!'
                });
            });

        });
    });
});

router.get('/', function(req, res, next) {
    Station.find({
        pending: false
    }, function(err, stations) {
        if (err) {
            return next(err);
        }
        res.json(stations);
    });
});

router.get('/pendings/', function(req, res, next) {
    Station.find({
        pending: true
    }, function(err, stations) {
        if (err) {
            return next(err);
        }
        res.json(stations);
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
