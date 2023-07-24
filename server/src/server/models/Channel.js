const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  bio: {
    type: String,
  },
  dp: {
    type: String,
  },
  banner: {
    type: String,
  }
});

const channelModel = mongoose.model('channelModel', channelSchema);

module.exports = channelModel;