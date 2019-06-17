const mongoose = require('mongoose');

let cardSchema = new mongoose.Schema({
  text: {
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
  listBelongsId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

let CardModel = mongoose.model('card', cardSchema);

module.exports = CardModel;
