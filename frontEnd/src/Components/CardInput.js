const dataController = require('../DataController');
const createElement = dataController.createElement;

function CardInput(listIndex, render) {
  dataController.getData.then(data => {
    let card = createElement('div');
    let cardInput = createElement('textarea', {
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
      data[listIndex].cards.push({
        text: cardInput.value,
        isModalOpen: false,
        isEdit: false,
      });
      dataController.setData(data);
      render();
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
  });
}

module.exports = CardInput;
