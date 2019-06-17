const dataController = require('../../DataController');
const ListInput = require('../ListInput');
const createElement = dataController.createElement;

function AddAnotherListButton(render) {
  dataController.getData.then(data => {
    let addAnotherList = createElement('button', {
      type: 'button',
      textContent: data.length == 0 ? '➕ Add list' : '➕ Add another list',
      className: 'addAnotherListButton',
    });
    addAnotherList.addEventListener('click', event => {
      columns.removeChild(addAnotherList);
      columns.appendChild(ListInput(render));
    });

    columns.appendChild(addAnotherList);
  });
}

module.exports = AddAnotherListButton;
