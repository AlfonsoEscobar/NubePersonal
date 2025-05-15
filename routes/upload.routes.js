const { Router } = require('express');
const router = Router();
const { upload, uploadImage } = require('../controllers/upload');

router.post('/', upload.single('image'), uploadImage);

module.exports = router;