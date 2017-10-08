var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var words = {
	"ORANGE":["It's a color", "orange.jpg"], 
	"TOMATO":["Rhymes with potato", "tomato.jpg"], 
	"BANANA":["It's yellow", "banana.jpg"], 
	"APPLE":["Keeps the doctor away", "apple.jpg"]
};
/*clone words array into originalWords*/
var originalWords = Object.assign({}, words);
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
	/*get an array of keys from words object and choose a random one*/
	var keysArray = Object.keys(words)
	randomWord = keysArray[Math.floor(Math.random() * keysArray.length)];
	document.getElementById("hint").innerHTML = words[randomWord][0];
	
	/*removes a word from the words remaining in the array, else if no more words then reset words object*/
	/*This allows each word from the list to be played only once while still being random in the list*/
	if(keysArray.length>1){
		delete words[randomWord];
	}
	else{
		words = Object.assign({}, originalWords);
	}	

	document.getElementById("currentWord").innerHTML = "";
	/*sets current word div and guesses array to be "-" times the amount of letters in the random word chosesn.*/
	for (var i = 0; i < randomWord.length; i++) {
		if(randomWord[i] === " ") {
			var letter = document.createElement("text");
			letter.innerHTML = " ";
			document.getElementById("currentWord").appendChild(letter);
			guesses[i] = " ";
		}
		else {	
			var letter = document.createElement("text");
			letter.innerHTML = "_";
			document.getElementById("currentWord").appendChild(letter);
			guesses[i] = "_";
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
			document.getElementById("imageHolder").setAttribute("src", "assets/images/" + originalWords[randomWord][1]);
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
			document.getElementById("loseText").innerHTML = "You Lost! The answer was: <br><br>" + randomWord + 
				"<br><br>Press 'R' to restart.";
			document.getElementById("imageHolder").setAttribute("src", "assets/images/" + originalWords[randomWord][1]);
			end = true;
		}
		
	}




	/*Checks if the game ended. Press "R" to restart. Resets game.*/
	if(restartR === "R" && end === true) {
		resetGame();
	}

}