let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#submit");
const form = document.querySelector("form");
const userInput = document.querySelector("#guessField");
const prevGuesses = document.querySelector(".guesses");
const remGuesses = document.querySelector(".remainGuesses");
const update = document.querySelector("#update");

let prev = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let guess = userInput.value;
        validate(guess);
    })
}

function validate(guess) {
    if (isNaN(guess)) {
        alert("Please Enter a Valid Number");
    }
    else if (guess < 1 || guess > 100) {
        alert("Enter a number between 1 to 100 ");
    }
    else {
        prev.push(guess);
        if (numGuess == 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random Number was ${randomNumber} `);
            endGame();
        }
        else {
            CheckGuess(guess);
            displayGuess(guess);
        }
    }
}

function CheckGuess(guess) {
    if (guess == randomNumber) {
        displayMessage(`Hurrah !!! You guessed the right number. You Won `);
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage("Your Guess is less than Random number. Try again")
    }
    else {
        displayMessage("Your Guess is greater than Random number. Try again")
    }
}

function displayGuess(guess) {
    if (numGuess == 1) {
        prevGuesses.innerHTML += " : ";
    }
    prevGuesses.innerHTML += `${guess} `;
    remGuesses.innerHTML = `${10 - numGuess} `;
    numGuess = numGuess + 1;
}

function displayMessage(message) {
    update.innerHTML = `${message}`;
}

function endGame() {
    alert(`Game Over!!! Random Number was ${randomNumber} `)
    playGame = false;

    submit.setAttribute("disabled", "");
    userInput.setAttribute("disabled", "");

    const button = document.createElement("input");
    button.id = "playAgain";
    button.value = "Play Again";
    button.style.background = "#007BFF";
    button.style.color = "#fff";
    button.style.width = "auto";
    button.style.textAlign = "center";
    button.style.border = "none";
    button.style.padding = " 10px 20px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.fontSize = "16px";
    button.style.transition = "background-color 0.3s";

    submit.replaceWith(button);
    button.addEventListener("click", function startNewGame() {
        console.log("HEllo");
        button.replaceWith(submit);
        submit.removeAttribute("disabled", "");
        userInput.removeAttribute("disabled", "");
        randomNumber = parseInt(Math.random() * 100 + 1);
        prev = [];
        numGuess = 1;
        prevGuesses.innerHTML = "";
        remGuesses.innerHTML = "10";
        update.innerHTML = "";
        playGame = true;
    });
}
