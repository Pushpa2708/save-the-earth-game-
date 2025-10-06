const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameOver = false;
let timerInterval;

function flipCard() {
  if (lockBoard || gameOver) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();

  if (document.querySelectorAll('.flip').length === 12) {
    setTimeout(() => {
      endGame('🎉 You Won!');
    }, 500);
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

function endGame(msg) {
  gameOver = true;
  clearInterval(timerInterval);
  cards.forEach(card => card.removeEventListener('click', flipCard));

  const messageBox = document.getElementById('game-message');
  messageBox.innerHTML = `
    <h2>${msg}</h2>
    <button id="playAgain">Play Again</button>
  `;
  messageBox.style.display = "block";

  document.getElementById('playAgain').addEventListener('click', () => {
    resetGame();
  });
}

function resetGame() {
  // Hide message
  document.getElementById('game-message').style.display = "none";

  // Reset timer UI
  document.querySelector('#time').textContent = "00:45";

  // Reset cards
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  shuffle();
  resetBoard();
  gameOver = false;

  // Restart timer
  startTimer();
}

function startTimer() {
  let duration = 45;
  const display = document.querySelector('#time');
  let timer = duration, minutes, seconds;

  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    if (gameOver) {
      clearInterval(timerInterval);
      return;
    }

    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      endGame('⏰ Time Up. Game Over.');
    }
  }, 1000);
}

window.onload = function () {
  shuffle();
  cards.forEach(card => card.addEventListener('click', flipCard));
  startTimer();
};



window.onload=function(){ cards.forEach(card => card.addEventListener('click', flipCard)); alert("The objective of this game is to match pairs.\n1. Click on a card to flip it over.\n2. If you select two cards which do not match up to make a pair, they will flip back over again.\n3. Try to remember where the different characters are so that you can make a match.\n4. The game finishes when you have matched all the pairs.\n5.You have only 45 seconds to complete it.\nLet us Start the Battle!"); startTimer() ; }