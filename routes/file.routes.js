const { Router } = require('express');
const router = Router();

const { listFile } = require('../controllers/files');


router.get('/listFile', listFile);


module.exports = router;