const dataController = require('../DataController');
const createCardSpace = require('../Components/CardSpace');
const createElement = dataController.createElement;

function List(title, listIndex, render) {
  let data = dataController.getData();
  let startCardObject = dataController.getStartCardObject();
  let startCardIndex = dataController.getStartCardIndex();
  let startListIndex = dataController.getStartListIndex();
  let finishCardIndex = dataController.getFinishCardIndex();
  let finishListIndex = dataController.getFinishListIndex();

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
    // window.localStorage.setItem('columns', JSON.stringify(data));
    render();
  });

  list.appendChild(deleteListButton);

  let titleContainer = createElement('div', { className: 'titleContainer' });

  titleContainer.addEventListener('dragover', event => {
    event.preventDefault();
    if (finishCardIndex == -1) {
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
    if (startListIndex !== listIndex) {
      finishListIndex = listIndex;
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
    console.log('startCardObject', startCardObject);
    console.log('startCardIndex', startCardIndex);
    console.log('startListIndex', startListIndex);
    console.log('finishCardIndex', finishCardIndex);
    console.log('finishListIndex', finishListIndex);
    if (finishListIndex > -1 && finishCardIndex > -1) {
      data[startListIndex].cards.splice(startCardIndex, 1);
      data[listIndex].cards.splice(finishCardIndex, 0, startCardObject);
    }
    if (finishListIndex > -1 && finishCardIndex == -1) {
      console.log(data);
      data[startListIndex].cards.splice(startCardIndex, 1);
      data[listIndex].cards.push(startCardObject);
    }
    if (finishListIndex == -1 && finishCardIndex > -1) {
      data[startListIndex].cards.splice(startCardIndex, 1);
      data[listIndex].cards.splice(finishCardIndex, 0, startCardObject);
    }
    dataController.resetVariables();
    // window.localStorage.setItem('columns', JSON.stringify(data));
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
