const dataController = require('../../DataController');
const cardSpace = require('../CardSpace');
const CardInput = require('../CardInput');
const createElement = dataController.createElement;

function addCardButton(listIndex, render) {
  let data = dataController.getData();
  let addCardButton = createElement('button', {
    type: 'button',
    textContent: data[listIndex].cards.length == 0 ? '➕ Add card' : '➕ Add another card',
    className: 'addCardBottom',
  });

  addCardButton.addEventListener('click', event => {
    addCardButton.parentNode.appendChild(CardInput(listIndex, render));
    addCardButton.parentNode.removeChild(addCardButton);
  });

  addCardButton.addEventListener('dragover', event => {
    if (document.querySelector('.cardSpace')) {
      document
        .querySelector('.cardSpace')
        .parentNode.removeChild(document.querySelector('.cardSpace'));
      let cardSpaceDiv = cardSpace();
      cardSpaceDiv.addEventListener('dragover', event => {
        dataController.setFinishCardIndex(data[listIndex].cards.length);
      });
      addCardButton.parentNode.insertBefore(cardSpaceDiv, addCardButton);
    }
  });

  return addCardButton;
}

module.exports = addCardButton;
