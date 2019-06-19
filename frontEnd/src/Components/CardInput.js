const dataController = require('../DataController');
const createElement = dataController.createElement;
const renderFN = require('../app');

function CardInput(listIndex, render) {
  let data = dataController.getData();
  let card = createElement('div');
  let cardInput = createElement('input', {
    type: 'text',
    placeholder: 'Enter text for this card',
    className: 'cardInput',
  });
  let cardButtons = createElement('div', {
    className: 'cardButtons',
  });

  let addCardButton = createElement('button', {
    type: 'button',
    textContent: 'Add Card',
    className: 'button',
  });
  addCardButton.addEventListener('click', event => {
    fetch('http://localhost:3000/api/createCard', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        text: cardInput.value,
        listId: data[listIndex]._id,
        position: data[listIndex].cards.length,
      }),
    })
      .then(res => res.json())
      .then(data => {
        render();
      })
      .catch(err => console.log(err));
  });
  cardButtons.appendChild(addCardButton);

  let exitCardButton = createElement('button', {
    type: 'button',
    textContent: '✖️',
    className: 'exitButton',
  });
  exitCardButton.addEventListener('click', event => {
    render();
  });
  cardButtons.appendChild(exitCardButton);
  card.appendChild(cardInput);
  card.appendChild(cardButtons);

  return card;
}

module.exports = CardInput;
