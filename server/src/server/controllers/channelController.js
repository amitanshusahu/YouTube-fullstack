const { default: mongoose } = require('mongoose');
const channelModel = require('../models/Channel');
const historyModel = require('../models/HistoryModel');
const LikedModel = require('../models/LikedModel');
const videoModel = require('../models/VideoModel');

module.exports.createChannel = async (req, res) => {
  const { username, bio, dp, banner } = req.body;

  const user = await channelModel.findOne({ username });
  if (user) return res.status(400).json({ status: false, msg: 'User already exits' })

  {
    // save username in Liked collection
    await LikedModel.create({ username, liked: [] });
  }

  {
    // save username in History collection
    await historyModel.create({ username, history: [] });
  }

  const channel = await channelModel.create({ username, bio, dp, banner });
  if (channel) res.status(200).json({ status: true });
  else res.status(500).json({ status: false, msg: "Error Creating Channel" });
}

module.exports.getChannel = async (req, res) => {
  const { username } = req.body;

  const channel = await channelModel.findOne({ username });
  if (channel) res.status(200).json({ status: true, channel });
  else res.status(500).json({ status: false, msg: "No Such Channel Exits" });
}

module.exports.me = (req, res) => {
  const { username } = req.user;
  res.status(200).json({ status: true, username });
}

module.exports.pushHistory = async (req, res) => {
  const { vid } = req.body;
  const { username } = req.user;

  let history = await historyModel.findOne({ username });
  history = history.history;

  // check if vid is alredy preset in history 
  const index = history.indexOf(vid);
  if (index > -1) {
    history.splice(index, 1);
  }

  history.push(vid);
  let updatedHistory = await historyModel.findOneAndUpdate({ username }, { history });
  res.status(200).json({ status: true });

}

module.exports.gethistory = async (req, res) => {
  const { username } = req.user;

  let history = await historyModel.findOne({ username });
  history = history.history;

  let arrOfObjHistory = history.map((id) => 
    new mongoose.Types.ObjectId(id)
  );

  const historyfeed = await videoModel.find({ _id: { $in: arrOfObjHistory } });
  res.status(200).json({ status: true, history: historyfeed });
}