var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
  	name: String,
  	location: String
});

mongoose.model('Station', StationSchema);