const dataController = require('../DataController');
const createElement = dataController.createElement;

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
    fetch('http://localhost:3000/api/createList', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: listTitle.value,
      }),
    })
      .then(response => response.json())
      .then(result => {
        render();
      })
      .catch(err => console.log(err));

    columns.removeChild(list);
  });
  listButtons.appendChild(addListButton);

  let exitListButton = createElement('button', {
    type: 'button',
    textContent: '✖️',
    className: 'exitButton',
  });
  exitListButton.addEventListener('click', event => {
    columns.removeChild(list);
    render();
  });
  listButtons.appendChild(exitListButton);
  list.appendChild(listButtons);

  return list;
}

module.exports = ListInput;
