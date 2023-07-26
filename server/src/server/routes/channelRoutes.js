const router = require('express').Router();
const { protect } = require('../modules/jwt');
const { createChannel, getChannel, me } = require('../controllers/channelController');

router.post('/createchannel', protect, createChannel);
router.post('/getchannel', getChannel);
router.get('/me',protect, me);

module.exports = router;