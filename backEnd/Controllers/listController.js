let ListModel = require('../Models/listModel');

let createList = (request, response) => {
  let data = request.body;
  let list = new ListModel();
  list.title = data.title;
  list.creator = request.user._id;
  list
    .save()
    .then(item => {
      response.json(item);
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let getAllLists = (request, response) => {
  ListModel.find({
    creator: request.user._id,
  }).then(items => {
    response.json(items);
  });
};

let deleteListById = (req, res) => {
  let id = req.params.id;
  ListModel.deleteOne({
    _id: id,
    creator: req.user._id,
  })
    .then(response => res.json(response))
    .catch(e => {
      res.status(400).json(e);
    });
};

let getList = (req, res) => {
  let id = req.params.id;
  ListModel.findOne({
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
  ListModel.findOne({
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

module.exports = {
  createList,
  getAllLists,
  deleteListById,
  toogleItem,
  getList,
};
