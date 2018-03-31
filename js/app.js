const openCards = [];
const cardGrid = document.querySelector('.card-grid');
const originalSymbolsArray = ['☕', '☸', '⚓', '⚛', '✐', '✈', '֍', '☃'];
let timerInterval;
let dateStart = Date.now();
// Helper function picking random number from 'min' to 'max'
function randomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}
//
// -----------> Time measuring
//
const timer = document.querySelector('.timer--time');
function timerFunction() {
  const dateNow = Date.now();
  const minutes = Math.floor(((dateNow - dateStart) / 1000) / 60);
  const seconds = Math.floor((((dateNow - dateStart) - (minutes * 60 * 1000)) / 1000));
  timer.textContent = `${(minutes < 10) ? `0${minutes}` : `${minutes}`}:${(seconds < 10) ? `0${seconds}` : seconds}`;
}
function stopTimer(interval) {
  clearInterval(interval);
}
//
// -----------> Randomizing cards and displaying them
//
function randomCardsCreate() {
  const cardsArray = [];
  const symbolsArray = originalSymbolsArray.slice(0);
  const symbolsArray2 = originalSymbolsArray.slice(0);
  const docFragment = document.createDocumentFragment();
  for (let i = 0; i <= 15; i += 1) {
    cardsArray[i] = document.createElement('div');
    cardsArray[i].classList.add('card');
    docFragment.appendChild(cardsArray[i]);
  }
  for (let i = 0; i <= 15; i += 1) {
    const arrayNumber = randomNumber(1, 2);
    if ((arrayNumber === 1 && symbolsArray.length !== 0) ||
        (arrayNumber === 2 && symbolsArray2.length === 0)) {
      const symbolNumber = randomNumber(0, symbolsArray.length - 1);
      cardsArray[i].textContent = symbolsArray[symbolNumber];
      symbolsArray.splice(symbolNumber, 1);
    } else if (symbolsArray2.length !== 0) {
      const symbolNumber = randomNumber(0, symbolsArray2.length - 1);
      cardsArray[i].textContent = symbolsArray2[symbolNumber];
      symbolsArray2.splice(symbolNumber, 1);
    }
  }
  cardGrid.appendChild(docFragment);
}
randomCardsCreate();
//
// -----------> Comparing selected cards
//
let numberOfMoves = 0;
let numberOfMatchedPairs = 0;
function areMatching() {
  const movesCounter = document.querySelector('.moves-counter');
  numberOfMoves += 1;
  movesCounter.textContent = `Moves: ${numberOfMoves}`;
  if (openCards[0].textContent === openCards[1].textContent) {
    openCards[0].classList.add('card--match');
    openCards[1].classList.add('card--match');
    numberOfMatchedPairs += 1;
    if (numberOfMatchedPairs === 8) {
      stopTimer(timerInterval);
      const winMessage = document.createElement('div');
      const winParagraph = document.createElement('p');
      const movesNumberParagraph = document.createElement('p');
      const restartButton = document.createElement('button');
      const timePlayed = document.createElement('p');
      restartButton.setAttribute('type', 'button');
      restartButton.classList.add('restart-button');
      restartButton.textContent = '↺';
      restartButton.addEventListener('click', (event) => {
        while (cardGrid.firstChild) {
          cardGrid.removeChild(cardGrid.firstChild);
        }
        numberOfMatchedPairs = 0;
        numberOfMoves = 0;
        movesCounter.textContent = `Moves: ${numberOfMoves}`;
        timer.classList.add('timer--not-started');
        timer.textContent = '00:00';
        randomCardsCreate();
        winMessage.remove();
        event.stopPropagation();
      });
      movesNumberParagraph.textContent = `Moves: ${numberOfMoves}`;
      movesNumberParagraph.classList.add('win-message-moves-counter');
      timePlayed.textContent = timer.textContent;
      winParagraph.textContent = 'Congratulations, you won!';
      winMessage.appendChild(winParagraph);
      winMessage.appendChild(movesNumberParagraph);
      winMessage.appendChild(timePlayed);
      winMessage.classList.add('win-message');
      winMessage.appendChild(restartButton);
      cardGrid.appendChild(winMessage);
    }
  } else {
    openCards[0].classList.add('card--nomatch');
    openCards[1].classList.add('card--nomatch');
    return false;
  }
  return true;
}
//
// ------------> On click card selecting and flipping
//
cardGrid.addEventListener('click', (event) => {
  if (openCards.length < 2) {
    if (!event.target.classList.contains('card')) { // Not allowing clicks on grid, already matched cards and win message
      return;
    }
    event.target.classList.add('card--open');
    if (event.target !== openCards[0]) openCards.push(event.target);
    if (numberOfMoves === 0 && openCards.length === 1 && timer.classList.contains('timer--not-started')) { // when first card is flipped start the timer
      dateStart = Date.now();
      timerInterval = setInterval(() => {
        timerFunction();
      }, 1000);
      timer.classList.remove('timer--not-started');
    }
    if (openCards.length === 2) {
      areMatching();
      setTimeout(() => {
        openCards[0].classList.remove('card--open', 'card--nomatch');
        openCards[1].classList.remove('card--open', 'card--nomatch');
        openCards.length = 0;
      }, 1400); // clearing the array and closing unmatched cards
    }
  }
});
