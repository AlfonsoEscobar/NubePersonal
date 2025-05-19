const { Router } = require('express');
const router = Router();
const { upload, uploadImage } = require('../controllers/upload.controller');

router.post('/', upload.single('image'), uploadImage);

module.exports = router;