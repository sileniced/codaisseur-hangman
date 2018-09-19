const $ = require('jquery');

const Game = require('../models/Game');
const words = require('../data/words');

const app = {
  game: new Game(words[Math.floor(Math.random() * words.length)]),
  guesses: [],

  init: function () {
    $( 'button#start' ).on('click', app.start);
    $( 'input#guess' ).on('keyup', app.guess);

    app.updateDisplay();
  },

  start: function () {
    app.guesses = [];
    app.game = new Game(words[Math.floor(Math.random() * words.length)]);
    $( 'p#info' ).html(app.game.INFO.default);
    app.updateDisplay();
  },

  guess: function () {

    const addGuess = letter => {
      if (!app.game.hasEnded(app.guesses)) {
        console.log(letter);
        if (app.guesses.includes(letter)) return app.game.INFO.duplicate(letter);
        app.guesses.push(letter)
        return app.game.winCondition(app.guesses);
      }
    };

    $( 'p#info' ).html(addGuess($(this).val()));
    $(this).val('');
    app.updateDisplay();
  },



  updateDisplay: function () {
    $( 'p#word' ).html(app.game.DISPLAY.word(app.guesses));
    $( 'p#guesses' ).html(app.game.DISPLAY.letters(app.guesses));
    $( 'div#hangman' ).html(app.game.DISPLAY.guesses(app.guesses))
  }

};

$(document).ready(function () {
  app.init();
});