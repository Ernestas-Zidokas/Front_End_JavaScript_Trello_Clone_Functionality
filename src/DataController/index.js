let data = [];
let startCardObject = null;
let startCardIndex = -1;
let startListIndex = -1;
let finishCardIndex = -1;
let finishListIndex = -1;

const getData = () => [...data];
const getDataLocalStorage = () => window.localStorage.getItem('columns');
const getStartCardObject = () => (startCardObject ? { ...startCardObject } : startCardObject);
const getStartCardIndex = () => startCardIndex;
const getStartListIndex = () => startListIndex;
const getFinishCardIndex = () => finishCardIndex;
const getFinishListIndex = () => finishListIndex;

const setData = storageData => {
  data = storageData;
  window.localStorage.setItem('columns', JSON.stringify(storageData));
};
const setStartCardObject = object => (startCardObject = object);
const setStartCardIndex = cardIndex => (startCardIndex = cardIndex);
const setStartListIndex = listIndex => (startListIndex = listIndex);
const setFinishCardIndex = finishCard => (finishCardIndex = finishCard);
const setFinishListIndex = finishList => (finishListIndex = finishList);

function resetVariables() {
  setStartCardObject(null);
  setStartCardIndex(-1);
  setStartListIndex(-1);
  setFinishCardIndex(-1);
  setFinishListIndex(-1);
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
};
