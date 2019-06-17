let ListModel = require('../Models/listModel');

let createList = (request, response) => {
  let data = request.body;
  let list = new ListModel();
  list.title = data.title;
  list.creator = request.user._id;
  list.save().then(item => {
    response.json(item).catch(e => {
      response.status(400).json(e);
    });
  });
};

let getAllLists = (request, response) => {
  ListModel.find({
    creator: request.user._id,
  }).then(items => {
    response.json(items);
  });
};

let deleteList = (req, res) => {
  let data = req.body;
  ListModel.deleteOne({
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

let getList = (req, res) => {
  let id = req.param('id');
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

module.exports = {
  createList,
  getAllLists,
  deleteList,
  getList,
};
