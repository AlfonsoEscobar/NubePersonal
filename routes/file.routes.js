const { Router } = require('express');
const router = Router();

const { listFile, renameFile, deleteFile } = require('../controllers/files');


router.get('/listFile', listFile);

router.patch('/renameFile', renameFile);

router.delete('/deleteFile', deleteFile);


module.exports = router;