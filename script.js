'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const totalScore0El = document.querySelector('#score--0'); // or getElByID
const totalScore1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// ---------- STARTING CONDITIONS -------------
let totalScores,
    currentScore,
    activePlayer,
    playing;

const init = function() {
  // variables
  totalScores = [0, 0]; // holds scores of both players
  currentScore = 0; // current score is not bound to any player
  activePlayer = 0;
  playing = true; // when finish game this variable helps to stop game functionality
  
  // Reset total scores and current scores
  // on the screen
  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // hide the dice
  diceEl.classList.add('hidden');
  // remove winner-styles
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // remove active-styles and add to 1 player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// ---------- SWITCHING PLAYERS -------------
const switchPlayer = function() {
  // 1. Reset current score
  document.getElementById(`current--${activePlayer}`).textContent = 0; // on the screen
  currentScore = 0; // as a variable

  // 2. Switch active player
  activePlayer = activePlayer === 0 ? 1 : 0; // as a variable
  player0El.classList.toggle('player--active'); // change styles
  player1El.classList.toggle('player--active'); // change styles
};

// ---------- ROLL DICE -------------
const diceRoll = function() {
  if(playing) {
    // 1. Generating random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
  
    // 2. Display the dice
    diceEl.classList.remove('hidden'); // show the dice
    diceEl.src = `img/dice-${diceNumber}.png`; // show img according to generated number
  
    // 3. Check if dice = 1
    if(diceNumber !== 1) {
      // if not 1 - add to current score
      currentScore += diceNumber; // as a variable
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; // show on the screen
    } else {
      // if = 1 - switch to next player
      switchPlayer();
    }
  }
};

// ---------- HOLD THE SCORE -------------
const holdScore = function() {
  if(playing && currentScore > 0) {
    // 1. Add current score to active player's score and set current score to 0
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = totalScores[activePlayer];
  
    // 2. Check if player's score is >= 100
    if(totalScores[activePlayer] >= 100) {
      // Finish the game if >= 100
      playing = false; // stop gaming functionality (rolling and holding)
      document.getElementById(`current--${activePlayer}`).textContent = 0; // reset current score
      diceEl.classList.add('hidden'); // hide the dice
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); // apply winner-styles
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // remove active-player styles
    } else {
      // Switch to the next player
      switchPlayer();
    }
  } else if(currentScore === 0) {
    alert('Roll the dice!');
  }
};

// ---------- PUSHING BUTTONS -------------
btnRollEl.addEventListener('click', diceRoll);
btnHoldEl.addEventListener('click', holdScore);
btnNewEl.addEventListener('click', init);

// ---------- OPEN-CLOSE GAME RULES -------------
const btnRulesEl = document.querySelector('.btn--rules');
const btnCloseEl = document.querySelector('.btn--close');
const popupEl = document.querySelector('.popup');
const overlayEl = document.querySelector('.overlay');

const openRules = function() {
  popupEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
};
const closeRules = function() {
  popupEl.classList.add('hidden');
  overlayEl.classList.add('hidden');
}

btnRulesEl.addEventListener('click', openRules);
btnCloseEl.addEventListener('click', closeRules);
