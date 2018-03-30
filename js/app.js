const openCards = [];
const cardGrid = document.querySelector('.card-grid');
const symbolsArray = ['☕', '☸', '⚓', '⚛', '✐', '✈', '֍', '☃'];
const symbolsArray2 = ['☕', '☸', '⚓', '⚛', '✐', '✈', '֍', '☃'];

// Helper function picking random number from 'min' to 'max'
function randomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}
//
// -----------> Randomizing cards and displaying them
//
const cardsArray = [];
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
//
// -----------> Comparing selected cards
//
let numberOfMatchedPairs = 0;
function areMatching() {
  if (openCards[0].textContent === openCards[1].textContent) {
    openCards[0].classList.add('card--match');
    openCards[1].classList.add('card--match');
    numberOfMatchedPairs += 1;
    if (numberOfMatchedPairs === 8) {
      const winMessage = document.createElement('div');
      const winTextNode = document.createTextNode('Congratulations, you won!');
      const winParagraph = document.createElement('p');
      winParagraph.appendChild(winTextNode);
      winMessage.appendChild(winParagraph);
      winMessage.classList.add('win-message');
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
    if (event.target.classList.contains('card-grid') || event.target.classList.contains('win-message') ||
    event.target.tagName === 'P') { // Not allowing clicks on grid, already matched cards and win message
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
      }, 1300); // clearing the array and closing unmatched cards
    }
  }
});

//
// ----------------> Win condition
//
