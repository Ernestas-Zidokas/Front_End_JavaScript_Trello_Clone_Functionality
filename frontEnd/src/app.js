const Card = require('./Components/Card');
const dataController = require('./DataController');
const addAnotherListButton = require('./Components/Buttons/AddAnotherListButton');
const createList = require('./Components/List');
const createElement = dataController.createElement;
const columns = document.querySelector('#columns');
const addCardButton = require('./Components/Buttons/AddCardButton');

window.addEventListener('load', event => {
  render();
});

function render() {
  dataController.getDataFromDb.then(data => {
    clearColumns();
    dataController.setData(data);
    data.forEach((column, listIndex) => {
      let list = createList(column, listIndex, render);
      let cardContainer = createElement('div', { className: 'cardContainer' });
      column.cards.forEach((card, cardIndex) => {
        cardContainer.appendChild(Card(card, cardIndex, listIndex, render));
      });

      cardContainer.appendChild(addCardButton(listIndex, render));
      list.appendChild(cardContainer);
      columns.appendChild(list);
    });
    addAnotherListButton(render);
  });
  // columns.appendChild(
  //   createElement('p', { className: 'loggedInAs', textContent: dataController.getUserEmail() }),
  // );
}

function clearColumns() {
  columns.innerHTML = '';
}
