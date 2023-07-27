const router = require('express').Router();
const { protect } = require('../modules/jwt');
const { createChannel, getChannel, me, pushHistory, gethistory } = require('../controllers/channelController');

router.post('/createchannel', protect, createChannel);
router.post('/getchannel', getChannel);
router.get('/me',protect, me);
router.post('/posthistory', protect, pushHistory);
router.get('/gethistory', protect, gethistory);

module.exports = router;