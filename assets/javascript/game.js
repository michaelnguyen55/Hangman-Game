var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var words = ["APPLE", "PEAR", "BANANA", "ORANGE", "TOMATO"]
var winsCounter = 0;
var lossesCounter = 0;
var guessesLeftCounter = 5;
var randomWord = "";
var currentGuesses = [];
var guesses = [];
var end = false;

var grabGuessesLeft = document.getElementById("guessesLeft");
var grabGuessedLetters = document.getElementById("guessedLetters");

/*Resets the word to another random word and resets everything else except for wins/losses*/
function resetGame() {
	guessesLeftCounter = 5;
	guesses = [];
	currentGuesses = [];
	randomWord = words[Math.floor(Math.random() * words.length)];
	document.getElementById("currentWord").innerHTML = "";
	for (var i = 0; i < randomWord.length; i++) {
		if(randomWord[i] === " ") {
			var letter = document.createElement("text");
			letter.innerHTML = "&nbsp;&nbsp;&nbsp;";
			document.getElementById("currentWord").appendChild(letter);
			guesses[i] = letter.innerHTML;

		}
		else {	
			var letter = document.createElement("text");
			letter.innerHTML = "_" + " ";
			document.getElementById("currentWord").appendChild(letter);
			guesses[i] = letter.innerHTML;
		}
	}
	grabGuessedLetters.innerHTML = currentGuesses;
	grabGuessesLeft.innerHTML = guessesLeftCounter;
	document.getElementById("winText").innerHTML = "";
	document.getElementById("loseText").innerHTML = "";
	end = false;
}

resetGame();

document.onkeyup = function(event) {

	var userGuess = event.key.toUpperCase();

	/*Checks if the game ended and only then you can press "R" to restart*/
	if(end === true) {
		var restartR = event.key.toUpperCase();
	}

	/*Checks if the user entered a letter. The letter must not be already used and the game didn't end yet*/
	if(alphabet.indexOf(userGuess)>-1 && currentGuesses.indexOf(userGuess) === -1 && end === false) {

		document.getElementById("currentWord").innerHTML = "";

		/*Change each "-" of guesses holder to a letter from randomWord if you typed a correct letter*/
		for(var j = 0; j < randomWord.length; j++) {
			
			if(userGuess === randomWord[j]) {
				guesses[j] = randomWord[j];
			}
			/*Sets currentWord div to guesses holder*/
			var letter = document.createElement("text");
			letter.innerHTML = guesses[j];
			document.getElementById("currentWord").appendChild(letter);

		}

		/*When you win, number of wins goes up and win text is displayed*/
		if(guesses.join("") === randomWord) {
			winsCounter++;
			grabGuessedLetters.innerHTML = currentGuesses.join(', ');
			grabGuessesLeft.innerHTML = guessesLeftCounter;
			document.getElementById("wins").innerHTML = winsCounter;
			document.getElementById("winText").innerHTML = "You Won!" + "<br><br>Press 'R' to restart.";
			end = true;
		}

		/*Guesses remaining don't go down if guessed correctly*/
		if(randomWord.indexOf(userGuess)>-1) {
			currentGuesses.push(userGuess);
			grabGuessedLetters.innerHTML = currentGuesses.join(', ');
		}
		/*Guesses remaining goes down if guessed incorrectly*/
		else {
			guessesLeftCounter--;
			currentGuesses.push(userGuess);
			grabGuessedLetters.innerHTML = currentGuesses.join(', ');
			grabGuessesLeft.innerHTML = guessesLeftCounter;
		}

		/*When you lose, number of losses goes up and lose text is displayed*/
		if(guessesLeftCounter === 0) {
			lossesCounter++;
			grabGuessedLetters.innerHTML = currentGuesses.join(', ');
			grabGuessesLeft.innerHTML = guessesLeftCounter;
			document.getElementById("losses").innerHTML = lossesCounter;
			document.getElementById("loseText").innerHTML = "You Lost! The answer was: <br><br>" + randomWord + "<br><br>Press 'R' to restart.";
			end = true;
		}
		
	}

	/*Checks if the game ended. Press "R" to restart. Resets game.*/
	if(restartR === "R" && end === true) {
		resetGame();
	}

}