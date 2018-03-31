const openCards = [];
const cardGrid = document.querySelector('.card-grid');
const originalSymbolsArray = ['☕', '☸', '⚓', '⚛', '✐', '✈', '֍', '☃'];
// Helper function picking random number from 'min' to 'max'
function randomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
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
      const winMessage = document.createElement('div');
      const winTextNode = document.createTextNode('Congratulations, you won!');
      const winParagraph = document.createElement('p');
      const movesNumberParagraph = document.createElement('p');
      const restartButton = document.createElement('button');
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
        randomCardsCreate();
        winMessage.remove();
        event.stopPropagation();
      });
      winParagraph.appendChild(winTextNode);
      movesNumberParagraph.textContent = `Moves: ${numberOfMoves}`;
      movesNumberParagraph.classList.add('win-message-moves-counter');
      winMessage.appendChild(winParagraph);
      winMessage.appendChild(movesNumberParagraph);
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

//
// ----------------> Win condition
//
