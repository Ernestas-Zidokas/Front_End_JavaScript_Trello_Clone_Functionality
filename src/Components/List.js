const dataController = require('../DataController');
const createCardSpace = require('../Components/CardSpace');
const createElement = dataController.createElement;

function List(column, listIndex, render) {
  let data = dataController.getData();
  let list = createElement('div', {
    className: 'list',
    draggable: true,
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
      console.log('start', dataController.getStartDragListIndex());
      console.log('finish', dataController.getFinishDragListIndex());

      if (dataController.getStartDragListIndex() > -1) {
        let listSpace = createElement('div', { className: 'listSpace', draggable: true });
        listSpace.addEventListener('drop', event => {
          // if (dataController.getFinishDragListIndex() == 0) {
          //   console.log('pirmas');

          //   data.splice(dataController.getStartDragListIndex(), 1);
          //   data.unshift(dataController.getStartDragListObject());
          // }

          if (dataController.getFinishDragListIndex() > -1) {
            console.log('antras');
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
        listSpace.addEventListener('dragover', event => {
          event.preventDefault();
        });
        listSpace.addEventListener('dragenter', event => {
          event.preventDefault();
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
    textContent: column.title,
  });

  titleContainer.appendChild(listTitle);
  list.appendChild(titleContainer);

  return list;
}

module.exports = List;
