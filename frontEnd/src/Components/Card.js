const dataController = require('../DataController');
const cardSpaceFunction = require('../Components/CardSpace');
const moreModalFunction = require('../Components/MoreModal');
const createElement = dataController.createElement;

function Card(cardData, cardIndex, listIndex, render) {
  dataController.getData.then(data => {
    let card = null;
    if (data[listIndex].cards[cardIndex].isEdit) {
      card = createElement('textarea', {
        value: cardData.text,
        className: 'card',
        draggable: dataController.getIsCardDraggable(),
      });
      // console.log(card.scrollHeight);

      // card.style.height = card.scrollHeight + 'px';
      card.addEventListener('keypress', event => {
        if (event.keyCode === 13) {
          dataController.setIsCardDraggable(true);
          dataController.setIsListDraggable(true);
          data[listIndex].cards[cardIndex].text = card.value;
          data[listIndex].cards[cardIndex].isModalOpen = !data[listIndex].cards[cardIndex]
            .isModalOpen;
          data[listIndex].cards[cardIndex].isEdit = !data[listIndex].cards[cardIndex].isEdit;
          dataController.setData(data);
          render();
        }
      });
    } else {
      card = createElement('p', {
        textContent: cardData.text,
        className: 'card',
        draggable: true,
      });
    }

    let moreCardButton = createElement('button', {
      type: 'button',
      className: 'moreCardButton exitButton',
      textContent: '⚪⚪⚪',
    });

    moreCardButton.addEventListener('click', event => {
      data[listIndex].cards[cardIndex].isModalOpen = !data[listIndex].cards[cardIndex].isModalOpen;
      let moreModalDiv = moreModalFunction(listIndex, cardIndex, render);
      if (data[listIndex].cards[cardIndex].isModalOpen) {
        card.appendChild(moreModalDiv);
      } else {
        if (card.querySelector('.moreModal')) {
          card.removeChild(card.querySelector('.moreModal'));
        }
      }
    });
    card.appendChild(moreCardButton);

    card.addEventListener('drag', event => {
      dataController.setStartCardObject(cardData);
      dataController.setStartCardIndex(cardIndex);
      dataController.setStartListIndex(listIndex);
      card.className = 'cardShadow';
      card.textContent = '';
    });

    card.addEventListener('dragend', event => {
      render();
    });

    card.addEventListener('dragover', event => {
      if (document.querySelector('.cardSpace')) {
        document
          .querySelector('.cardSpace')
          .parentNode.removeChild(document.querySelector('.cardSpace'));
      }

      if (
        cardIndex !== dataController.getStartCardIndex() ||
        listIndex !== dataController.getStartListIndex()
      ) {
        if (document.querySelector('.cardShadow')) {
          document
            .querySelector('.cardShadow')
            .parentNode.removeChild(document.querySelector('.cardShadow'));
        }

        if (!document.querySelector('.cardSpace')) {
          if (dataController.getStartDragListIndex() == -1) {
            let cardSpace = cardSpaceFunction();
            cardSpace.addEventListener('dragover', event => {
              if (
                cardIndex !== dataController.getStartCardIndex() ||
                listIndex !== dataController.getStartListIndex()
              ) {
                if (
                  dataController.getStartCardIndex() < cardIndex &&
                  listIndex == dataController.getStartListIndex()
                ) {
                  dataController.setFinishCardIndex(cardIndex - 1);
                } else {
                  dataController.setFinishCardIndex(cardIndex);
                }
              }
            });
            card.parentNode.insertBefore(cardSpace, card);
          }
        }
      }
    });

    card.addEventListener('dragenter', event => {
      event.preventDefault();
    });

    card.addEventListener('dragleave', event => {
      event.preventDefault();
      if (cardIndex == dataController.getFinishCardIndex()) {
        dataController.setFinishCardIndex(-1);
      }
    });

    return card;
  });
}
module.exports = Card;
