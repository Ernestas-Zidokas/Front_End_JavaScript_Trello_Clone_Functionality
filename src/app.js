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
  let storageData = dataController.getDataLocalStorage();
  if (storageData != null) {
    storageData = JSON.parse(storageData);
    dataController.setData(storageData);
    data = dataController.getData();
    clearColumns();

    data.forEach((column, listIndex) => {
      let list = createList(column.title, listIndex, render);
      let cardContainer = createElement('div', { className: 'cardContainer' });
      columns.appendChild(list);
      column.cards.forEach((card, cardIndex) => {
        cardContainer.appendChild(Card(card, cardIndex, listIndex, render));
      });

      cardContainer.appendChild(addCardButton(listIndex, render));
      list.appendChild(cardContainer);
    });
  }
  addAnotherListButton(render);
}

function clearColumns() {
  columns.innerHTML = '';
}
