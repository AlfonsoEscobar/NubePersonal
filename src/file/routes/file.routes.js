const { Router } = require('express');
const router = Router();

const { validateToken } = require('../services/validateToken');
const { listFile, renameFile, deleteFile } = require('../controllers/files.controller');


router.get('/listFile', authenticateMid, listFile);

router.patch('/renameFile', renameFile);

router.delete('/deleteFile', deleteFile);


module.exports = router;