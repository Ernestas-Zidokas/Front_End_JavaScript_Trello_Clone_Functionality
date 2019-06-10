const dataController = require('../DataController');
const createCardSpace = require('../Components/CardSpace');
const createElement = dataController.createElement;

function List(title, listIndex, render) {
  let data = dataController.getData();
  let list = createElement('div', {
    className: 'list',
  });

  let deleteListButton = createElement('button', {
    type: 'button',
    className: 'deleteListButton exitButton',
    textContent: '✖️',
  });

  deleteListButton.addEventListener('click', event => {
    data.splice(listIndex, 1);
    dataController.setData(data);
    render();
  });

  list.appendChild(deleteListButton);

  let titleContainer = createElement('div', { className: 'titleContainer' });

  titleContainer.addEventListener('dragover', event => {
    event.preventDefault();
    if (dataController.getFinishCardIndex() == -1) {
      if (document.querySelector('.cardSpace')) {
        document
          .querySelector('.cardSpace')
          .parentNode.removeChild(document.querySelector('.cardSpace'));
      }
      list.lastChild.insertBefore(createCardSpace(), list.lastChild.lastChild);
    }
  });

  list.addEventListener('dragover', event => {
    event.preventDefault();
    if (dataController.getStartListIndex() !== listIndex) {
      dataController.setFinishListIndex(listIndex);
    }
  });

  titleContainer.addEventListener('dragenter', event => {
    event.preventDefault();
  });

  list.addEventListener('dragenter', event => {
    event.preventDefault();
  });

  list.addEventListener('dragleave', event => {
    event.preventDefault();
  });

  list.addEventListener('drop', event => {
    if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() > -1) {
      data[dataController.getStartListIndex()].cards.splice(dataController.getStartCardIndex(), 1);
      data[listIndex].cards.splice(
        dataController.getFinishCardIndex(),
        0,
        dataController.getStartCardObject(),
      );
    }
    if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() == -1) {
      data[dataController.getStartListIndex()].cards.splice(dataController.getStartCardIndex(), 1);
      data[listIndex].cards.push(dataController.getStartCardObject());
    }
    if (dataController.getFinishListIndex() == -1 && dataController.getFinishCardIndex() > -1) {
      data[dataController.getStartListIndex()].cards.splice(dataController.getStartCardIndex(), 1);
      data[listIndex].cards.splice(
        dataController.getFinishCardIndex(),
        0,
        dataController.getStartCardObject(),
      );
    }
    dataController.resetVariables();
    dataController.setData(data);
    render();
  });

  let listTitle = createElement('h4', {
    type: 'text',
    textContent: title,
  });

  titleContainer.appendChild(listTitle);
  list.appendChild(titleContainer);

  return list;
}

module.exports = List;
