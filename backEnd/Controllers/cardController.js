let CardModel = require('../Models/cardModel');

let createCard = (request, response) => {
  let data = request.body;
  let card = new CardModel();
  card.text = data.text;
  card.listBelongsId = data.listId;
  card.position = data.position;
  card.creator = request.user._id;
  card
    .save()
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getAllCards = (request, response) => {
  CardModel.find({
    creator: request.user._id,
  }).then(items => {
    response.json(items);
  });
};

let deleteCardById = (req, res) => {
  let id = req.params.id;
  CardModel.deleteOne({
    _id: id,
    creator: req.user._id,
  })
    .then(response => res.json(response))
    .catch(e => {
      res.status(400).json(e);
    });
};

let deleteCardsByListId = (req, res) => {
  let id = req.params.id;
  CardModel.deleteMany({
    listBelongsId: id,
    creator: req.user._id,
  })
    .then(response => res.json(response))
    .catch(e => {
      res.status(400).json(e);
    });
};

let getCard = (req, res) => {
  let id = req.params.id;
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

let toogleItem = (req, res) => {
  let id = req.params.id;
  CardModel.findOne({
    _id: id,
    creator: req.user._id,
  })
    .then(item => {
      item.checked = !item.checked;
      item.save().then(savedItem => res.json(savedItem));
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

let updateCardPosition = (req, res) => {
  let data = req.body;
  let id = req.params.id;
  CardModel.findOne({
    _id: id,
    creator: req.user._id,
  })
    .then(item => {
      item.position = data.position;
      if (data.listBelongsId) {
        item.listBelongsId = data.listBelongsId;
      }
      item.save().then(savedItem => res.json(savedItem));
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

module.exports = {
  createCard,
  getAllCards,
  deleteCardById,
  toogleItem,
  getCard,
  updateCardPosition,
  deleteCardsByListId,
};
