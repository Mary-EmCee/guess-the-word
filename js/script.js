//global variables

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingDisplay = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
let word = "pizza";
const usedLetters = [];
let guessesRemaining = 8;

const getWord = async function() {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    //console.log(data);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random () * wordArray.length);
    
    word = wordArray[randomIndex].trim();
    updateProgress(word);
}


//display symbols as placeholders for the chosen word's letters

const updateProgress = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●")
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

getWord();

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
     countGuesses(guess);
     updateWordDisplay(guess);
     correctGuess(usedLetters);
  console.log(usedLetters);
 }
};

updateWordDisplay = function () {
    guessedLetters.innerHTML = "";
    for (const letter of usedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
    }
};

const correctGuess = function (usedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray); 

    const revealLetters = [];
    for (const letter of wordArray) {
        if(usedLetters.includes(letter)) {
            revealLetters.push(letter.toUpperCase());
         } else {
            revealLetters.push("●");
        }
        wordInProgress.innerText = revealLetters.join("");
        youWin();
    }
};

const countGuesses = function(guess) {
    const upperWord = word.toUpperCase();
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry! The letter ${guess} is not in the word 🤔`;
        guessesRemaining -= 1;
    } else {
        message.innerText = `Nice guessing! The letter ${guess} is in the word.`
    }
    if(guessesRemaining === 0) {
        message.innerText = `Sorry, your game is over 😌. The word is ${word.toUpperCase()}.`
    } else if (guessesRemaining === 1) {
        remainingGuesses.innerHTML = "You have <span> 1 guess</span> remaining.";
    } else if (guessesRemaining > 1) {
        remainingGuesses.innerHTML = `You have <span> ${guessesRemaining} guesses</span> remaining.`;
    }
};






const youWin = function () {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
}