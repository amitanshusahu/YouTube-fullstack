const router = require('express').Router();
const {protect} = require('../modules/jwt');
const { createCollections, getSubscribed, subscribe, unsubscribe, isSubscribed} = require('../controllers/subscriptionController');

router.get('/createcollection',protect, createCollections);
router.get('/getsubscribed',protect, getSubscribed);
router.post('/subscribe', protect, subscribe);
router.post('/unsubscribe', protect, unsubscribe);
router.post('/issubscribed', protect, isSubscribed);


module.exports = router;