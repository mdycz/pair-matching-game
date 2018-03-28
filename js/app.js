const openCards = [];
const cardGrid = document.querySelector('.card-grid');

//
// -----------> Card flipping and selecting on click
//

cardGrid.addEventListener('click', (event) => {
  if (openCards.length < 2) {
    event.target.classList.toggle('card--open');
    openCards.push(event.target);
  }
});
