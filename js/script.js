const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingDisplay = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});