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
    dataController.setIsCardDraggable(false);
    dataController.setIsListDraggable(false);
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
    fetch(`http://localhost:3000/api/deleteCardById/${data[listIndex].cards[cardIndex]._id}/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        render();
      })
      .catch(err => console.log(err));
  });

  moreModal.appendChild(editCardButton);
  moreModal.appendChild(deleteCardButton);
  return moreModal;
}

module.exports = MoreModal;
