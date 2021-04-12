//creating the model for games to be used with the databse
//this is just the blueprint/parameters for our data
const mongoose = require('mongoose');

//game schema
const gameSchema = mongoose.Schema({
  header: {type: String, default: 'TAG'},
  title: { type: String, required: true, maxlength: 30 },
  artist: { type: String, required: true, maxlength: 30 },
  album: { type: String, maxlength: 30 },
  year: { type: String},
  zeroByte: { type: String},
  comment: { type: String, maxlength: 240 },
  track: { type: String},
  genre: { type: String, maxlength: 15 }
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('game', gameSchema);
