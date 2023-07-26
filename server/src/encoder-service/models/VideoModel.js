const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  dp: {
    type: String
  },
  date: {
    type: Date,
    default: () => Date()
  },
  m3u8: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  thumbnail: {
    type: String,
    require: true
  },
  tags: {
    type: String,
    require: true
  }
});

const videoModel = mongoose.model('videoModel', videoSchema);

module.exports = videoModel;