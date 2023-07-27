const router = require('express').Router();
const { protect } = require('../modules/jwt');
const { getVideoFeed, getVideo, likevideo, getLikeCount, unlikevideo, isLiked, comment, getComments, getChannelFeed, getPublicFeed } = require('../controllers/videoController');

router.get('/getfeed', protect, getVideoFeed);
router.post('/getvideo', getVideo);
router.post('/likevideo', protect, likevideo);
router.post('/likecount', getLikeCount);
router.post('/unlikevideo', protect, unlikevideo);
router.post('/isliked', protect, isLiked);
router.post('/comment', protect, comment);
router.post('/getcomments', getComments);
router.post('/getchannelfeed', getChannelFeed);
router.get('/getpublicfeed', getPublicFeed);

module.exports = router;
