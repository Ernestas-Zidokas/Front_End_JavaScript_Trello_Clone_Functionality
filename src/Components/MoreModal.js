const dataController = require('../DataController');
const createElement = dataController.createElement;

function MoreModal(listIndex, cardIndex, render) {
  let data = dataController.getData();
  let moreModal = createElement('div', { className: 'moreModal' });
  let editCardButton = createElement('button', {
    className: 'editButton',
    textContent: '✏️',
    type: 'button',
  });

  editCardButton.addEventListener('click', event => {
    data[listIndex].cards[cardIndex].isEdit = !data[listIndex].cards[cardIndex].isEdit;
    dataController.setData(data);
    render();
  });

  let deleteCardButton = createElement('button', {
    className: 'deleteButton',
    textContent: '✖️',
    type: 'button',
  });

  deleteCardButton.addEventListener('click', event => {
    data[listIndex].cards.splice(cardIndex, 1);
    dataController.setData(data);
    render();
  });

  moreModal.appendChild(editCardButton);
  moreModal.appendChild(deleteCardButton);
  return moreModal;
}

module.exports = MoreModal;
