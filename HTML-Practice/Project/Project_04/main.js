let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const btn = document.createElement('button');

let prevGuess = [];
let numGuess = 0;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1) {
        alert("Please enter a number greater than 0");
    } else if (guess > 100) {
        alert("Please enter a number smaller than 100");
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game over. The random number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('The guess is too low.');
    } else if (guess > randomNumber) {
        displayMessage('The guess is too high.');
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += ` ,${guess}`;
    numGuess++;
    remaining.innerHTML = `${10 - numGuess} guesses remaining`;
}

function displayMessage(message) {
    lowOrHi.textContent = message;
}



function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled','');
    btn.className = 'button';
    button.innerHTML = 'Start new Game';
    startOver.appendChild('btn');
    playGame = false;
    newGame();
}


function newGame() {
    const newgameBtn = document.querySelector('#button');
    newgameBtn.addEventListener('click', function(e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 0;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${10 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(btn);
        playGame = true;
    });
}