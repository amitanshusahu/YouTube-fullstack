const channelModel = require('../models/Channel');

module.exports.createChannel = async (req, res) => {
  const { username, bio, dp, bannner } = req.body;

  const user = await channelModel.findOne({username});
  if ( user ) res.status(400).json({status: false, msg: 'User already exits'})

  const channel = await channelModel.create({username, bio, dp, bannner});
  if ( channel )  res.status(200).json({status: true});
  else res.status(500).json({status: false, msg: "Error Creating Channel"});
}