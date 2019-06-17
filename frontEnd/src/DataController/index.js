let data = [];
let startCardObject = null;
let startCardIndex = -1;
let startListIndex = -1;
let finishCardIndex = -1;
let finishListIndex = -1;

let startDragListObject = null;
let startDragListIndex = -1;
let finishDragListIndex = -1;
let isCardDraggable = true;
let isListDraggable = true;

let userToken = null;
let userEmail = null;

const getData = () => [...data];
const getDataLocalStorage = () => window.localStorage.getItem('columns');
const getStartCardObject = () => (startCardObject ? { ...startCardObject } : startCardObject);
const getStartCardIndex = () => startCardIndex;
const getStartListIndex = () => startListIndex;
const getFinishCardIndex = () => finishCardIndex;
const getFinishListIndex = () => finishListIndex;

const getStartDragListObject = () =>
  startDragListObject ? { ...startDragListObject } : startDragListObject;
const getStartDragListIndex = () => startDragListIndex;
const getFinishDragListIndex = () => finishDragListIndex;

const setData = storageData => {
  data = storageData;
  window.localStorage.setItem('columns', JSON.stringify(storageData));
};
const setStartCardObject = object => (startCardObject = object);
const setStartCardIndex = cardIndex => (startCardIndex = cardIndex);
const setStartListIndex = listIndex => (startListIndex = listIndex);
const setFinishCardIndex = finishCard => (finishCardIndex = finishCard);
const setFinishListIndex = finishList => (finishListIndex = finishList);

const setStartDragListObject = object => (startDragListObject = object);
const setStartDragListIndex = dragListIndex => (startDragListIndex = dragListIndex);
const setFinishDragListIndex = dragListIndex => (finishDragListIndex = dragListIndex);

const getIsCardDraggable = () => isCardDraggable;
const setIsCardDraggable = bool => (isCardDraggable = bool);
const getIsListDraggable = () => isListDraggable;
const setIsListDraggable = bool => (isListDraggable = bool);

const setUserToken = token => (userToken = token);
const getUserToken = () => userToken;
const setUserEmail = email => (userEmail = email);
const getUserEmail = () => userEmail;

function resetVariables() {
  setStartCardObject(null);
  setStartCardIndex(-1);
  setStartListIndex(-1);
  setFinishCardIndex(-1);
  setFinishListIndex(-1);
  setStartDragListObject(null);
  setStartDragListIndex(-1);
  setFinishDragListIndex(-1);
}

function createElement(type, params) {
  let element = document.createElement(type);
  if (params) {
    Object.entries(params).forEach(parameter => {
      element[parameter[0]] = parameter[1];
    });
  }

  return element;
}

module.exports = {
  getData,
  getDataLocalStorage,
  getStartCardObject,
  getStartCardIndex,
  getStartListIndex,
  getFinishCardIndex,
  getFinishListIndex,
  setData,
  setStartCardObject,
  setStartCardIndex,
  setStartListIndex,
  setFinishCardIndex,
  setFinishListIndex,
  resetVariables,
  createElement,
  getStartDragListObject,
  getStartDragListIndex,
  getFinishDragListIndex,
  setStartDragListObject,
  setStartDragListIndex,
  setFinishDragListIndex,
  getIsCardDraggable,
  setIsCardDraggable,
  getIsListDraggable,
  setIsListDraggable,
  setUserToken,
  getUserToken,
  setUserEmail,
  getUserEmail,
};