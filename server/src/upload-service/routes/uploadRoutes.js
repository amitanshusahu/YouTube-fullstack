const { protect } = require('../modules/jwt');
const router = require('express').Router();
const { upload } = require('../controllers/uploadController');

router.post('/upload',protect, upload);

module.exports = router;
