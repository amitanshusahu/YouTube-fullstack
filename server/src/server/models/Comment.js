const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  vid : {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  dp: {
    type: String
  }
});

const commentModal = mongoose.model('commentModel', commentSchema);

module.exports = commentModal;
