const channelModel = require('../models/Channel');
const LikeModel = require('../models/LikeModel');
const LikedModel = require('../models/LikedModel');

module.exports.createChannel = async (req, res) => {
  const { username, bio, dp, banner } = req.body;

  const user = await channelModel.findOne({username});
  if ( user ) return res.status(400).json({status: false, msg: 'User already exits'})

  {
    // save username in Liked collection
    await LikedModel.create({username, liked: []});
  }

  const channel = await channelModel.create({username, bio, dp, banner});
  if ( channel )  res.status(200).json({status: true});
  else res.status(500).json({status: false, msg: "Error Creating Channel"});
}

module.exports.getChannel = async (req, res) => {
  const { username } = req.body;
  
  const channel = await channelModel.findOne({username});
  if ( channel )  res.status(200).json({status: true, channel});
  else res.status(500).json({status: false, msg: "No Such Channel Exits"});
}

module.exports.me = (req, res ) => {
  const { username } = req.user;
  res.status(200).json({status: true, username});
}