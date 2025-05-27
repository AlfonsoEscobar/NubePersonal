const { Router } = require('express');
const router = Router();

const { listFile, renameFile, deleteFile } = require('../controllers/files.controller');
const { authenticateMid } = require('../../auth/middleware/auth.middleware')


router.get('/listFile', authenticateMid, listFile);

router.patch('/renameFile', renameFile);

router.delete('/deleteFile', deleteFile);


module.exports = router;