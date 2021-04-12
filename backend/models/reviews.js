const mongoose = require('mongoose');

//schema for reviews in the database
const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String, required: true, maxlength: 240 },
  gameName: { type: String, ref: 'Game', required: true},
  username: { type: String, required: true}
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('Reviews', reviewSchema);
