var mongoose = require('mongoose');

var StationSchema = new mongoose.Schema({
  	name: String,
  	location: String,
  	reviews : [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}]
});

mongoose.model('Station', StationSchema);