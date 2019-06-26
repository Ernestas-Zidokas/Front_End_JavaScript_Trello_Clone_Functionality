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
    fetch(`http://localhost:3000/api/deleteCardsByListId/${data[listIndex]._id}/`, {
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
          // render();
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
    //card is dragged to another list
    if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() > -1) {
      fetch(
        `http://localhost:3000/api/updateCardPosition/${
          data[dataController.getStartListIndex()].cards[dataController.getStartCardIndex()]._id
        }`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth': window.localStorage.getItem('token'),
          },
          body: JSON.stringify({
            listBelongsId: data[dataController.getFinishListIndex()]._id,
            position:
              dataController.getFinishCardIndex() == -1 ? 0 : dataController.getFinishCardIndex(),
          }),
        },
      )
        .then(res => res.json())
        .then(data => {})
        .catch(err => console.log(err));

      for (
        let i = dataController.getFinishCardIndex();
        i < data[dataController.getFinishListIndex()].cards.length;
        i++
      ) {
        fetch(
          `http://localhost:3000/api/updateCardPosition/${
            data[dataController.getFinishListIndex()].cards[i]._id
          }`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth': window.localStorage.getItem('token'),
            },
            body: JSON.stringify({
              position: i + 1,
            }),
          },
        )
          .then(res => res.json())
          .then(data => {})
          .catch(err => console.log(err));
      }
    }
    //card is dragged on another list, but placed in the back
    if (dataController.getFinishDragListIndex() > -1) {
      if (dataController.getFinishListIndex() > -1 && dataController.getFinishCardIndex() == -1) {
        fetch(
          `http://localhost:3000/api/updateCardPosition/${
            data[dataController.getStartListIndex()].cards[dataController.getStartCardIndex()]._id
          }`,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth': window.localStorage.getItem('token'),
            },
            body: JSON.stringify({
              listBelongsId: data[dataController.getFinishListIndex()]._id,
              position: data[dataController.getFinishListIndex()].cards.length,
            }),
          },
        )
          .then(res => res.json())
          .then(data => {})
          .catch(err => console.log(err));
      }
    }
    //card is dragged inside same list
    if (dataController.getFinishListIndex() == -1 && dataController.getFinishCardIndex() > -1) {
      fetch(
        `http://localhost:3000/api/updateCardPosition/${
          data[dataController.getStartListIndex()].cards[dataController.getStartCardIndex()]._id
        }`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth': window.localStorage.getItem('token'),
          },
          body: JSON.stringify({
            position: dataController.getFinishCardIndex(),
          }),
        },
      )
        .then(res => res.json())
        .then(data => {
          // console.log(data);
        })
        .catch(err => console.log(err));
      //card is dragged inside same list down
      if (dataController.getStartCardIndex() < dataController.getFinishCardIndex()) {
        for (let i = dataController.getFinishCardIndex(); i > 0; i--) {
          fetch(`http://localhost:3000/api/updateCardPosition/${data[listIndex].cards[i]._id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth': window.localStorage.getItem('token'),
            },
            body: JSON.stringify({
              position: i - 1,
            }),
          })
            .then(res => res.json())
            .then(data => {
              // console.log(data);
            })
            .catch(err => console.log(err));
        }
      }
      //card is dragged inside same list up
      if (dataController.getStartCardIndex() > dataController.getFinishCardIndex()) {
        for (
          let i = dataController.getFinishCardIndex();
          i < dataController.getStartCardIndex();
          i++
        ) {
          fetch(`http://localhost:3000/api/updateCardPosition/${data[listIndex].cards[i]._id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-auth': window.localStorage.getItem('token'),
            },
            body: JSON.stringify({
              position: i + 1,
            }),
          })
            .then(res => res.json())
            .then(data => {
              // console.log(data);
            })
            .catch(err => console.log(err));
        }
      }
    }

    dataController.resetVariables();
    // render();
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
