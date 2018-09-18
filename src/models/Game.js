module.exports = class Game {
  constructor(word) {
    console.log(word);

    this.INFO = {
      duplicate: letter => `the letter ${letter} has already been ${this.word.includes(letter) ? 'guessed' : 'tried'}`,
      lost: () => `you have lost, the word was: '${this.word.join('')}' | please press start`,
      won: `good job | to play again, press start`,
      default: ''
    };

    this.DISPLAY = {
      letters: () => this.guesses.reduce((acc, guess) => acc + (`<span class="${this.word.includes(guess) ? 'right' : 'wrong'}-guess">${guess} </span>`), ''),
      guesses: () => `${this.wrongGuesses()}/6 wrong guesses`,
      word: () => this.word.reduce((acc, letter) => acc + (this.guesses.includes(letter) ? `${letter} ` : `_ `), '')
    };

    this.word = word.split('');
    this.guesses = [];

    this.isGuessed = () => !this.word.filter(letter => !this.guesses.includes(letter)).length;
    this.isLost = () => this.wrongGuesses() >= 6;
    this.wrongGuesses = () => this.guesses.reduce((acc, guess) => acc + (this.word.includes(guess) ? 0 : 1), 0);

    this.guessLetter = (letter) => {
      if (!(this.isGuessed() || this.isLost())) {
        if (this.guesses.includes(letter)) return this.INFO.duplicate(letter);
        this.guesses.push(letter);
        if (this.isGuessed()) return this.INFO.won;
        if (this.isLost()) return this.INFO.lost();
        return this.INFO.default;
      }
    }
  }
};