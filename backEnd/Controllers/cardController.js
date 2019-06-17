let CardModel = require('../Models/cardModel');

let createCard = (request, response) => {
  let data = request.body;
  let card = new CardModel();
  card.text = data.text;
  card.listBelongsId = data.listId;
  card.creator = request.user._id;
  card.save().then(item => {
    response.json(item).catch(e => {
      response.status(400).json(e);
    });
  });
};

let getAllCards = (request, response) => {
  CardModel.find({
    creator: request.user._id,
  }).then(items => {
    response.json(items);
  });
};

let deleteCard = (req, res) => {
  let data = req.body;
  CardModel.deleteOne({
    creator: req.user._id,
    _id: data._id,
  })
    .then(item => {
      res.json(item);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

// let deleteItemById = (req, res) => {
//   let id = req.param('id');
//   ToDoModel.deleteOne({
//     _id: id,
//     creator: req.user._id,
//   }).then(response => {
//     res.json(response).catch(e => {
//       res.status(400).json(e);
//     });
//   });
// };

let getCard = (req, res) => {
  let id = req.param('id');
  CardModel.findOne({
    _id: id,
    creator: req.user._id,
  })
    .then(item => {
      res.json(item);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  getCard,
};
