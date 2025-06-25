const allBoxes = document.querySelectorAll(".card");
const board = document.getElementById("game-board");
const helpbtn = document.getElementById("helpbtn");
const helpsection = document.getElementById("helpsection");
const closeHelpBtn = document.getElementById("closeHelpBtn");
const timerEl = document.getElementById("timer");
const movesEl = document.getElementById("moves-container");
const scoreEl = document.getElementById("score-container");

let cards = [];
let matchedCards = 0;
let selectedCards = [];
let seconds = 0;
let timerIsRunning = false;
let moves = 0;
let score = 0;

for (let i = 0; i < allBoxes.length; i++) {
  cards.push(allBoxes[i]);
}

for (let i = 0; i < cards.length; i++) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const temp = cards[randomIndex];
  cards[randomIndex] = cards[i];
  cards[i] = temp;
}

board.innerHTML = "";

for (const card of cards) {
  board.appendChild(card);
}



function hideCards() {
  for (const card of cards) {
    card.classList.add("card--hidden");
  }
}

setTimeout(hideCards, 2000);

function onCardClick(event) {
  const card = event.currentTarget;
  if (selectedCards.length < 2) {
    card.classList.remove("card--hidden");
    selectedCards.push(card);
    card.removeEventListener("click", onCardClick);

    if (!timerIsRunning && moves === 0) {
      startGame();
    }
  }

  if (selectedCards.length === 2) {
    updateMoves();

    const img1 = selectedCards[0].querySelector("img").src;
    const img2 = selectedCards[1].querySelector("img").src;

    if (img1 === img2) {
      updateScore(10);
      matched();
    } else {
      notMatched();
    }
  }
}

const matched = () => {
  selectedCards[0].classList.add("card--matched");
  selectedCards[1].classList.add("card--matched");

  matchedCards++;
  selectedCards = [];

  if (matchedCards === cards.length / 2) {
    showWinPopup();
  }
};

const notMatched = () => {
  disableAll();
  selectedCards[0].classList.add("card-notmatched");
  selectedCards[1].classList.add("card-notmatched");

  setTimeout(() => {
    selectedCards[0].classList.remove("card-notmatched");
    selectedCards[1].classList.remove("card-notmatched");

    selectedCards[0].classList.add("card--hidden");
    selectedCards[1].classList.add("card--hidden");

    selectedCards[0].addEventListener("click", onCardClick);
    selectedCards[1].addEventListener("click", onCardClick);

    selectedCards = [];
    enableAll();
  }, 1000);
};

const disableAll = () => {
  for (const card of cards) {
    card.classList.add("card--disabled");
  }
};

const enableAll = () => {
  for (const card of cards) {
    card.classList.remove("card--disabled");
  }
};

for (const card of cards) {
  card.addEventListener("click", onCardClick);
}

function showWinPopup() {
  document.getElementById("winPopup").style.display = "flex";
  stopTimer();
}

function closeWinPopup() {
  document.getElementById("winPopup").style.display = "none";
  restartGame();
}

helpbtn.addEventListener("click", () => {
  helpsection.style.display = "block";
});

closeHelpBtn.addEventListener("click", () => {
  helpsection.style.display = "none";
});

function restartGame() {
  window.location.reload();
}

function startTimer() {
  if (!timerIsRunning) {
    timerIsRunning = true;
    runTimer();
  }
}

function runTimer() {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;

  if (mins < 10) {
    mins = "0" + mins;
  } else {
    mins = String(mins);
  }

  if (secs < 10) {
    secs = "0" + secs;
  } else {
    secs = String(secs);
  }
  timerEl.innerHTML = `<div class="">Timer</div>${mins}:${secs}`;

  seconds++;

  setTimeout(() => {
    if (timerIsRunning) runTimer();
  }, 1000);
}

function stopTimer() {
  timerIsRunning = false;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  timerEl.innerHTML = `<div class="timer_label">Timer</div>00:00`;
}

function updateMoves() {
  moves++;
  movesEl.innerHTML = `<div class="score-moves_lebel">Moves</div>${moves}`;
}

function updateScore(points) {
  score += points;
  scoreEl.innerHTML = `<div class="score-moves_lebel">Score</div>${score}`;
}

function resetScoreboard() {
  moves = 0;
  score = 0;
  movesEl.innerHTML = `<div class="score-moves_lebel">Moves</div>0`;
  scoreEl.innerHTML = `<div class="score-moves_lebel">Score</div>0`;
}

function startGame() {
  resetTimer();
  resetScoreboard();
  startTimer();
}
