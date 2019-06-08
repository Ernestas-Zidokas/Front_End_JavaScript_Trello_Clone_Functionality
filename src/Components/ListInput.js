const dataController = require('../DataController');
const createElement = dataController.createElement;
const AddAnotherListButton = require('./Buttons/AddAnotherListButton');

function ListInput(render) {
  let data = dataController.getData();
  let list = createElement('div', {
    className: 'listInput',
  });

  let listTitle = createElement('input', {
    type: 'text',
    placeholder: 'Enter list title',
    className: 'listTitleInput',
  });

  list.appendChild(listTitle);

  let listButtons = createElement('div', {
    className: 'listButtons',
  });

  let addListButton = createElement('button', {
    type: 'button',
    textContent: 'Add List',
    className: 'button',
  });
  addListButton.addEventListener('click', event => {
    data.push({
      title: listTitle.value,
      cards: [],
    });
    columns.removeChild(list);
    dataController.setData(data);
    // window.localStorage.setItem('columns', JSON.stringify(data));
    render();
  });
  listButtons.appendChild(addListButton);

  let exitListButton = createElement('button', {
    type: 'button',
    textContent: '✖️',
    className: 'exitButton',
  });
  exitListButton.addEventListener('click', event => {
    columns.removeChild(list);
    AddAnotherListButton(render);
  });
  listButtons.appendChild(exitListButton);
  list.appendChild(listButtons);

  return list;
}

module.exports = ListInput;
