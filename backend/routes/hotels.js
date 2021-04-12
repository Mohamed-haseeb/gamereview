const express = require('express');
const Game = require('../models/games');
const auth = require('../parsereqs/check-auth');

const router = express.Router();

//creating a new game
router.post('', auth, (req, res, next) => {
  const game = new Game({
    title: req.body.title,
    artist: req.body.artist,
    header: req.body.header,
    album: req.body.album,
    year: req.body.year,
    zeroByte: req.body.zeroByte,
    comment: req.body.comment,
    track: req.body.track,
    genre: req.body.genre
  });
  game.save().then(result => {
    res.status(201).json({
      message: 'Game added successfully.',
      gameId: result._id
    });
  });
});

// fetching all games in the database
router.get('', (req, res, next) => {
  Game.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Game fetched successfully!',
      games: documents
    });
  });
});

//deleting a single game, specified by its id
router.delete('/:id', auth, (req, res, next) => {
  game.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'game successfully deleted.'
    });
  });
});

module.exports = router;
