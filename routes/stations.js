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
    var location = req.query.place;
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

router.get('/count-by-city', function(req, res, next) {
    Station.find({
        pending: false
    }, function(err, stations) {
        if (err) {
            return next(err);
        }
        var map = _groupByCity(stations)
        map.sort(function(a, b) {
            return req.query.s === 'desc' ? b.v.length - a.v.length : a.v.length - b.v.length
        })
        var result = {
            labels: [],
            data: []
        }
        for (var i = 0; i < Math.min(map.length, 3); i++) {
            var entry = map[i]
            result.data.push(entry.v.length)
            result.labels.push(entry.k)
        }
        res.json(result);
    })
});

router.get('/avg-by-city', function(req, res, next) {
    Station.find({
        pending: false
    }, function(err, stations) {
        if (err) {
            return next(err);
        }
        var map = _groupByCity(stations)
        map = _avgByCity(map)
        var result = {
            labels: [],
            data: []
        }
        map.sort(function(a, b) {
            return req.query.s === 'desc' ? b.v - a.v : a.v - b.v
        })
        for (var i = 0; i < Math.min(map.length, 3); i++) {
            var entry = map[i]
            result.data.push(entry.v)
            result.labels.push(entry.k)
        }
        res.json(result);
    })
});

router.get('/reviews-by-city', function(req, res, next) {
    Station.find({
            pending: false
        }).populate('reviews')
        .exec(function(err, stations) {
            if (err) {
                return next(err);
            }
            var map = _groupByCity(stations)
            map = _reviewsByCity(map)
            var result = {
                labels: [],
                data: []
            }
            map.sort(function(a, b) {
                return req.query.s === 'desc' ? b.v - a.v : a.v - b.v
            })
            for (var i = 0; i < Math.min(map.length, 3); i++) {
                var entry = map[i]
                result.data.push(entry.v)
                result.labels.push(entry.k)
            }
            res.json(result);
        })
});

router.get('/summary-by-city', function(req, res, next) {
    Station.find({
            pending: false
        }).populate('reviews')
        .exec(function(err, stations) {
            if (err) {
                return next(err);
            }
            var map = _groupByCity(stations)
            map = _summaryByCity(map)
            map.sort(function(a, b) {
                return a.k.localeCompare(b.k)
            })
            var result = {
                labels: [],
                data: []
            }
            for (entry of map) {
                result.labels.push(entry.k)
                result.data.push([entry.v.general, entry.v.reception, entry.v.structure, entry.v.attendence, entry.v.punctuality])
            }
            res.json(result);
        })
});


function _groupByCity(stations) {
    var result = [];
    for (var i = 0; i < stations.length; i++) {
        var station = stations[i]
        var city = _city(station)
        var entry = _find(city, result)
        if (entry) {
            entry.v.push(station)
        } else {
            entry = {
                k: city,
                v: [station]
            }
            result.push(entry)
        }
    }
    return result;
}

function _city(station) {
    var location = station.location;
    if (typeof location === 'string') {
        var res = location.split(',')
        if (res.length === 5) {
            return res[2].trim();
        }
    }
}

function _find(city, map) {
    for (var i = 0; i < map.length; i++) {
        entry = map[i]
        if (entry.k === city) {
            return entry
        }
    }
}

function _avgByCity(map) {
    var nMap = []
    for (entry of map) {
        var nEntry = {
            k: entry.k,
            v: _avg(entry.v)
        }
        nMap.push(nEntry)
    }
    return nMap
}

function _reviewsByCity(map) {
    var nMap = []
    for (entry of map) {
        var nEntry = {
            k: entry.k,
            v: _sumReviews(entry.v)
        }
        nMap.push(nEntry)
    }
    return nMap
}

function _avg(stations) {
    var length = stations.length
    var sum = 0;
    for (var i = 0; i < length; i++) {
        var station = stations[i]
        var score = station.scoreAverage
        sum += score ? score : 0
    }
    return sum / length
}

function _sumReviews(stations) {
    var sum = 0
    for (station of stations) {
        var reviews = station.reviews;
        sum += reviews ? reviews.length : 0
    }
    return sum
}

function _summaryByCity(map) {
    var result = []
    for (entry of map) {
        var nEntry = {
            k: entry.k,
            v: _summary(entry.v)
        }
        result.push(nEntry)
    }
    return result
}

function _summary(stations) {
    var summary = {
        general: 0,
        reception: 0,
        structure: 0,
        attendence: 0,
        punctuality: 0
    }
    var count = 0
    for (station of stations) {
        var reviews = station.reviews
        if (reviews) {
            for (review of reviews) {
                count++
                summary.general += review.scoreGeneral
                summary.reception += review.scoreReception
                summary.structure += review.scoreStructure
                summary.attendence += review.scoreAttendence
                summary.punctuality += review.scorePunctuality
            }
        }
    }
    summary.general = summary.general / count
    summary.reception = summary.reception / count
    summary.structure = summary.structure / count
    summary.attendence = summary.attendence / count
    summary.punctuality = summary.punctuality / count
    return summary
}

module.exports = router;
