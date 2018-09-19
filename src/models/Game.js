module.exports = class Game {
  constructor(word) {
    console.log(word);
    this.word = word.split('');

    this.INFO = {
      duplicate: letter => `the letter ${letter} has already been ${this.word.includes(letter) ? 'guessed' : 'tried'}`,
      lost: () => `you have lost, the word was: '${this.word.join('')}' | please press start`,
      won: `good job | to play again, press start`,
      default: ''
    };

    this.DISPLAY = {
      letters: guesses => guesses.reduce((acc, guess) => acc + (`<span class="${this.word.includes(guess).toString()}-guess">${guess} </span>`), ''),
      guesses: guesses => `${this.wrongGuesses(guesses)}/6 wrong guesses`,
      word: guesses => this.word.reduce((acc, letter) => acc + (guesses.includes(letter) ? `${letter} ` : `_ `), '')
    };

  }

  isGuessed (guesses) {
    console.log(guesses);
    return !this.word.filter(letter => !guesses.includes(letter)).length;
  }

  isLost (guesses) {
    return this.wrongGuesses(guesses) >= 6;
  }

  wrongGuesses (guesses) {
    return guesses.reduce((acc, guess) => acc + !this.word.includes(guess), 0);
  }

  hasEnded (guesses) {
    return this.isGuessed(guesses) || this.isLost(guesses);
  }

  winCondition (guesses) {
    if (this.isGuessed(guesses)) return this.INFO.won;
    if (this.isLost(guesses)) return this.INFO.lost();
    return this.INFO.default;
  };
};