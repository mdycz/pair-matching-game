const openCards = [];
const cardGrid = document.querySelector('.card-grid');

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
      }, 1500); // clearing the array and closing cards
    }
  }
});
