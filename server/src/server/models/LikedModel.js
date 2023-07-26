const mongoose = require('mongoose');

const likedSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  liked: []
})

module.exports = mongoose.model("LikedModel", likedSchema);