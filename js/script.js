//global variables

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingDisplay = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const usedLetters = [];

//display symbols as placeholders for the chosen word's letters

const updateProgress = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

updateProgress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    
    const niceGuess = verifyGuess(guess);

    if(niceGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";

});



const verifyGuess = function(input) {
    const acceptedLetter = /[a-zA-Z]/;

    //if the input is empty
    if(input.length === 0) {
        message.innerHTML = "Please enter a letter 😀";
        //if input is more than one letter
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter 😁";
        //if input is not a letter
    } else if(!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z 😊";
        //when a single letter is input
    } else {
        return input;
    }
};

const makeGuess = function(guess) {
 guess = guess.toUpperCase();
 if (usedLetters.includes(guess)) {
     message.innerText = "You already guessed that letter. Please try again!";
 } else {
     usedLetters.push(guess);
 console.log(usedLetters);
 }
};
