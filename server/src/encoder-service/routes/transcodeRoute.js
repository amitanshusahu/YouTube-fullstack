const router = require('express').Router();
const transcoderController = require('../controllers/transcoderController');

router.get('/stream/:manifest', transcoderController.stream);

module.exports = router;
