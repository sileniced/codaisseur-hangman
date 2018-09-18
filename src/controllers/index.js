const $ = require('jquery');

const Game = require('../models/Game');
const words = require('../data/words');

const index = {
  game: new Game(words[Math.floor(Math.random() * words.length)]),

  init: function () {
    $( 'button#start' ).on('click', index.start);
    $( 'input#guess' ).on('keyup', index.guess);

    index.updateDisplay();
  },

  start: function () {
    index.game = new Game(words[Math.floor(Math.random() * words.length)]);
    $( 'p#info' ).html(index.game.INFO.default);
    index.updateDisplay();
  },

  guess: function () {
    $( 'p#info' ).html(index.game.guessLetter($(this).val()));
    $(this).val('');
    index.updateDisplay();
  },

  updateDisplay: function () {
    $( 'p#word' ).html(index.game.DISPLAY.word());
    $( 'p#guesses' ).html(index.game.DISPLAY.letters());
    $( 'div#hangman' ).html(index.game.DISPLAY.guesses())
  }

};

$(document).ready(function () {
  index.init();
});