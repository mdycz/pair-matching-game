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
function areMatching() {
  if (openCards[0].textContent === openCards[1].textContent) {
    openCards[0].classList.add('card--match');
    openCards[1].classList.add('card--match');
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
    if (event.target.classList.contains('card-grid')) { // Not allowing clicks on grid (or already matched cards)
      return;
    }
    event.target.classList.toggle('card--open');
    if (event.target.classList.contains('card--open')) openCards.push(event.target);
    else openCards.pop();
    if (openCards.length === 2) {
      areMatching();
      setTimeout(() => {
        openCards[0].classList.remove('card--open', 'card--nomatch');
        openCards[1].classList.remove('card--open', 'card--nomatch');
        openCards.length = 0;
      }, 1200); // clearing the array and closing unmatched cards
    }
  }
});
