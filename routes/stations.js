var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Station = mongoose.model('Station');

router.get('/', function(req, res, next) {
	Station.find(function(err, stations) {
		if (err) {
			return next(err);
		}
		res.json(stations);
	});
});

router.post('/', function(req, res, next) {
  var station = new Station(req.body);

  station.save(function(err, station){
    if(err){ return next(err); }

    res.json(station);
  });
});

module.exports = router;
