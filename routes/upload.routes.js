const { Router } = require('express');
const router = Router();
const { upload, uploadImage } = require('../controllers/upload');

/**
 * En este js se indican las rutas que hara referencia a 
 */

router.post('/', upload.single('image'), uploadImage);

module.exports = router;