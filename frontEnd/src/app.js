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

    // columns.appendChild(
    //   createElement('p', { className: 'loggedInAs', textContent: dataController.getUserEmail() }),
    // );
    data.forEach((column, listIndex) => {
      let list = createList(column, listIndex, render);
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

// fetch('http://localhost:3000/api/getAllLists', {
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'x-auth':
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA0MTM1MGEzZjkzZjJkZDgxNTQxNGMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTYwNTQ4MTgyfQ.7n4uaEjKBO28dYkA4KBfU-6TO5_SJJBApbBw0BAFAN0',
//   },
// })
//   .then(responseList => responseList.json())
//   .then(resultList => {
//     fetch('http://localhost:3000/api/getAllCards', {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'x-auth':
//           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA0MTM1MGEzZjkzZjJkZDgxNTQxNGMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTYwNTQ4MTgyfQ.7n4uaEjKBO28dYkA4KBfU-6TO5_SJJBApbBw0BAFAN0',
//       },
//     })
//       .then(responseCard => responseCard.json())
//       .then(resultCard => {
//         resultList.forEach((list, listIndex) => {
//           let sortedCardsByListArr = resultCard.filter(card => card.listBelongsId == list._id);
//           resultList[listIndex].cards = sortedCardsByListArr;
//           console.log(resultList);
//         });
//       })
//       .catch(err => console.log(err));
//   })
//   .catch(err => console.log(err));
