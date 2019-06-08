const dataController = require('../DataController');
const createElement = dataController.createElement;

function CardSpace() {
  return createElement('div', { className: 'cardSpace' });
}

module.exports = CardSpace;
