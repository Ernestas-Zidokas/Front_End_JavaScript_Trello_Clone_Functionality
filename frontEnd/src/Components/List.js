const dataController = require('../DataController');
const createCardSpace = require('../Components/CardSpace');
const createElement = dataController.createElement;

function List(column, listIndex, render) {
  let data = dataController.getData();
  let list = createElement('div', {
    className: 'list',
    draggable: dataController.getIsListDraggable(),
  });

  list.addEventListener('drag', event => {
    if (event.target.className !== 'cardShadow') {
      dataController.setStartDragListObject(column);
      dataController.setStartDragListIndex(listIndex);
      list.className = 'listShadow';
      list.style.height = `${list.clientHeight}px`;
      list.textContent = '';
    }
  });

  let deleteListButton = createElement('button', {
    type: 'button',
    className: 'deleteListButton exitButton',
    textContent: '✖️',
  });

  deleteListButton.addEventListener('click', event => {
    fetch(`http://localhost:3000/api/deleteListById/${data[listIndex]._id}/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': window.localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        render();
      })
      .catch(err => console.log(err));
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

    //List drag starts

    if (listIndex !== dataController.getStartDragListIndex()) {
      if (document.querySelector('.listShadow')) {
        list.parentNode.removeChild(document.querySelector('.listShadow'));
      }

      dataController.setFinishDragListIndex(listIndex);

      if (document.querySelector('.listSpace')) {
        document
          .querySelector('.listSpace')
          .parentNode.removeChild(document.querySelector('.listSpace'));
      }

      if (dataController.getStartDragListIndex() > -1) {
        let listSpace = createElement('div', { className: 'listSpace', draggable: true });
        listSpace.addEventListener('drop', event => {
          if (dataController.getFinishDragListIndex() > -1) {
            data.splice(dataController.getStartDragListIndex(), 1);
            data.splice(
              dataController.getFinishDragListIndex(),
              0,
              dataController.getStartDragListObject(),
            );
          }
          dataController.resetVariables();
          dataController.setData(data);
          render();
        });
        listSpace.style.height = `${list.clientHeight}px`;
        if (dataController.getStartDragListIndex() < listIndex) {
          list.parentNode.insertBefore(listSpace, list.nextSibling);
        } else {
          list.parentNode.insertBefore(listSpace, list);
        }
      }
    }
  });
  list.addEventListener('dragend', event => {
    render();
  });
  //List drag ends
  list.addEventListener('drop', event => {
    if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() > -1) {
      data[dataController.getStartListIndex()].cards.splice(dataController.getStartCardIndex(), 1);
      data[listIndex].cards.splice(
        dataController.getFinishCardIndex(),
        0,
        dataController.getStartCardObject(),
      );
    }
    if (dataController.getFinishDragListIndex() > -1) {
      if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() == -1) {
        data[dataController.getStartListIndex()].cards.splice(
          dataController.getStartCardIndex(),
          1,
        );
        data[listIndex].cards.push(dataController.getStartCardObject());
      }
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

  let listTitle = null;
  if (data[listIndex].isEdit) {
    listTitle = createElement('input', {
      type: 'text',
      value: column.title,
      className: 'listTitleInput',
    });
    listTitle.addEventListener('keypress', event => {
      if (event.keyCode === 13) {
        dataController.setIsListDraggable(true);
        data[listIndex].title = listTitle.value;
        data[listIndex].isEdit = !data[listIndex].isEdit;
        dataController.setData(data);
        render();
      }
    });
  } else {
    listTitle = createElement('h4', {
      type: 'text',
      textContent: column.title,
    });
  }

  listTitle.addEventListener('dblclick', event => {
    dataController.setIsListDraggable(false);
    data[listIndex].isEdit = !data[listIndex].isEdit;
    dataController.setData(data);
    render();
  });

  titleContainer.appendChild(listTitle);
  list.appendChild(titleContainer);

  return list;
}

module.exports = List;
