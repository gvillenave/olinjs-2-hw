var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var catSchema = mongoose.Schema({
  name: String,
  age: Number,
  colors: [String]
});

var Cats = mongoose.model('Cats', catSchema);

module.exports = Cats;