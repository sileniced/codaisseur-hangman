const assert = require('assert');
const app = require('../controllers/index');

describe('Starting a game', () => {
  const game = app.start('control');
  it('should generate a display', () => {
    assert.equal(game.displayWord(), '_ _ _ _ _ _ _ ')
  });
  it('should know the word', () => {
    assert.equal(game.word, 'control')
  })
});

describe('Guessing a letter', () => {
  const game = app.start('control');
  const guess = 'r';
  game.guessLetter(guess);
  it('should add a letter to the guess array', () => {
    assert.equal(game.guesses[0], guess)
  });
  it('should show a letter of the word if isGuessed correctly', () => {
    assert.equal(game.displayWord(), '_ _ _ _ r _ _ ', 'added r');
    game.guessLetter('o');
    assert.equal(game.displayWord(), '_ o _ _ r o _ ', 'added o');
    game.guessLetter('n');
    assert.equal(game.displayWord(), '_ o n _ r o _ ', 'added n');
  });
  it('should add up the wrong guesses counter when isGuessed wrong', () => {
    app.guess(game, 'p');
    assert.equal(game.wrong, 1);
    assert.equal(game.displayWord(), '_ o n _ r o _ ')
  });
});

describe('Ending a game', () => {
  const game = app.start('control');
  it('should show the whole word when the game finishes', () => {
    for (const guess of 'control'.split('')) {
      app.guess(game, guess);
    }
    assert.equal(game.displayWord(), 'c o n t r o l ')
  });
  it('should give a LOSE response when you have lost', () => {
    for (const guess of 'abcdefg'.split('')) {
      app.guess(game, guess);
    }
    assert.equal(game.displayWord(), 'c o n t r o l ')
  });
  it('should give a WIN response when you have won', () => {

  });
  it('should prompt you to play again', () => {

  })
});