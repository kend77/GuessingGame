//Generate Winning Number

function generateWinningNumber()  {
  var random = Math.random();
  if(random === 0)  {
    return 1;
  }
  return Math.floor(random * 100) + 1;
}

//Shuffle

function shuffle(arr) {
  var m = arr.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

//Game

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

//Difference

Game.prototype.difference = function()  {
  if(this.playersGuess - this.winningNumber < 0)  {
    return (this.playersGuess - this.winningNumber) * - 1;
  }
  return this.playersGuess - this.winningNumber;
}

//isLower

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber
}

//Player's Submission

Game.prototype.playersGuessSubmission = function(guess) {
  if(guess < 1 || guess > 100 || isNaN(guess))  {
    throw 'That is an invalid guess.';
  }
    this.playersGuess = guess;
    return this.checkGuess();
}

//Check Guess

Game.prototype.checkGuess = function()  {
  if(this.playersGuess === this.winningNumber)  {
    $('#hint, #submit').prop("disabled",true);
    $('#subtitle').text("Press the Reset button to play again!");
    return 'You Win!'
  }
  if(this.pastGuesses.indexOf(this.playersGuess) > - 1) {
    $('h1').text('Guess Again!')
    return 'You have already guessed that number.'
  }
  if(this.playersGuess !== this.winningNumber) {
    this.pastGuesses.push(this.playersGuess)
    $('#guesslist li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
    if(this.pastGuesses.length ===  5)  {
      $('#hint, #submit').prop("disabled",true);
      $('#subtitle').text("Press the Reset button to play again!");
      return 'You Lose.'
    }
  }
  if(this.isLower()) {
    $('#subtitle').text("Guess Higher!")
  } else {
    $('#subtitle').text("Guess Lower!")
}
  if(this.difference() < 10)  {
    return 'You\'re burning up!'
  }
  if(this.difference() < 25)  {
    return 'You\'re lukewarm.'
  }
  if(this.difference() < 50)  {
    return 'You\'re a bit chilly.'
  }
  if(this.difference() < 100)  {
    return 'You\'re ice cold!'
  }
}

//new Game function not on prototype

function newGame()  {
  return new Game();
}

// Provide hint function.
Game.prototype.provideHint = function() {
  var hintArr = [];
  hintArr.push(this.winningNumber);
  while(hintArr.length < 3) {
    hintArr.push(generateWinningNumber());
  }
  return shuffle(hintArr)
}



function guessInput(game) {
  var guess = $('#players-input').val();
  $('#players-input').val("");
  var output = game.playersGuessSubmission(Number(guess));
  $('#title').text(output);
}



//document ready
$(document).ready(function() {

  var game = new Game();

  $('#submit').click(function() {
    guessInput(game);
  });

  $('players-input').keypress(function(event) {
    if(event.which === 13)  {
      guessInput(game);
    }
  });

  $('#hint').click(function() {
    var hints = game.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});

  $('#reset').click(function() {
    game = newGame();
    $('#title').text('Play the Guessing Game!');
    $('#subtitle').text('Guess a number between 1-100!')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);
  })
});
