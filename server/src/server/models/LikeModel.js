const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  vid: {
    type: String,
    require: true,
  },
  like: {
    type: Number,
  }
})

module.exports = mongoose.model("LikeModel", likeSchema);