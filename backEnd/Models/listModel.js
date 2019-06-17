const mongoose = require('mongoose');

let listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isEdit: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

let ListModel = mongoose.model('list', listSchema);

module.exports = ListModel;
