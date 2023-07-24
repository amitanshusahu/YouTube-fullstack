const router = require('express').Router();
const { protect } = require('../modules/jwt');
const { createChannel } = require('../controllers/channelController');

router.post('/createchannel', protect, createChannel);

module.exports = router;