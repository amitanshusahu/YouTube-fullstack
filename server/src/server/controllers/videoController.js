const videoModel = require('../models/VideoModel');
const subscribedModel = require('../models/SubscribedModel');
const LikeModel = require('../models/LikeModel');
const LikedModel = require('../models/LikedModel');

module.exports.getVideoFeed = async (req, res) => {
  const { username } = req.user;

  let subscribed = await subscribedModel.findOne({username});
  subscribed = subscribed.subscribed;
  subscribed.push(username);
  const feed = await videoModel.find({username: { $in : subscribed}});

  if(feed.length > 0) res.status(200).json({status: true, feed});
  else res.status(400).json({status: false, msg: 'Failed to get feed'});
}

module.exports.getVideo = async (req, res) => {
  const { vid }  = req.body;

  try{
    const video = await videoModel.findById(vid);
    res.status(200).json({status: true, metadata: video});
  }
  catch(ex){
    console.log(ex);
    res.status(500).json({status: false, msg : 'No such video'});
  }
}

module.exports.likevideo = async (req, res) => {
  const { vid } = req.body;
  const { username } = req.user;

  let unique = true;
  let likedvideos = await LikedModel.findOne({username});
  likedvideos = likedvideos.liked;

  // check if username has already liked the video
  for ( let i =0; i < likedvideos.length; i++){
    if (likedvideos[i] == vid){
      unique = false;
    }
  }

  if (!unique) { return res.status(400).json({status: false, msg: "Vido Alredy Liked"})};

  // add video to username's liked video
  likedvideos.push(vid);
  await LikedModel.findOneAndUpdate({username}, {liked: likedvideos});

  // increase liked count
  let like = await LikeModel.findOne({vid});
  like = like.like;
  like ++;

  const updatedLike = await LikeModel.findOneAndUpdate({vid}, {like});
  updatedLike
  ? res.status(200).json({status: true, like})
  : res.status(500).json({status: false, msg: 'failed to update like count'});
}


module.exports.getLikeCount = async (req, res) => {
  const { vid } = req.body;

  let likecount = await LikeModel.findOne({vid});
  likecount = likecount.like;
  res.status(200).json({status: true, likecount});
}

module.exports.unlikevideo = async (req, res) => {
  const { vid } = req.body;
  const { username } = req.user;

  let unique = true;
  let likedvideos = await LikedModel.findOne({username});
  likedvideos = likedvideos.liked;

  // check if username has already unliked the video
  for ( let i =0; i < likedvideos.length; i++){
    if (likedvideos[i] == vid){
      unique = false;
    }
  }

  if (unique) { return res.status(400).json({status: false, msg: "Vido Alredy Unliked"})};

  // remove video to username's liked video
  const index = likedvideos.indexOf(vid);
    if (index > -1) {
      likedvideos.splice(index, 1);
    }
  await LikedModel.findOneAndUpdate({username}, {liked: likedvideos});

  // decincrease liked count
  let like = await LikeModel.findOne({vid});
  like = like.like;
  like --;

  const updatedLike = await LikeModel.findOneAndUpdate({vid}, {like});
  updatedLike
  ? res.status(200).json({status: true, like})
  : res.status(500).json({status: false, msg: 'failed to update like count'});
}

module.exports.isLiked = async (req, res) => {
  const { vid } = req.body;

  let liked = await LikedModel.findOne({username: req.user.username});
  liked  = liked.liked;

  for ( let i = 0; i < liked.length; i++){
    if(liked[i] == vid){
      return res.status(200).json({status: true});
    }
  }

  res.status(200).json({status: false});
}