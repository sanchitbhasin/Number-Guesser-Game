let min = 1,
    max = 10,
    winNum = setRandomNum(min, max),
    guessesLeft = 3;

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessInput = document.querySelector('#guess-input'),
    guessBtn = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Enter a number between ${min} and ${max}`, 'red');
        return ;
    }

    //game over - won
    if(guess === winNum) {
        gameOver(true, `${guess} is correct, You Won!!!`);
    } else {
        guessesLeft -= 1;

        //game over - lost
        if(guessesLeft === 0) {
            gameOver(false, `Game Over, you lost. The Correct number was ${winNum}`);
        } else {
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is Incorrect, ${guessesLeft} guesses left`, 'red');
        }
    }
});

function gameOver(won, msg) {
    guessInput.disabled = true;
    let color = won === true ? 'green' : 'red';
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    //play again
    guessBtn.className += 'play-again';
    guessBtn.value = 'Play Again';
    guessBtn.style.borderColor = 'green';
}

function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

function setRandomNum(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}