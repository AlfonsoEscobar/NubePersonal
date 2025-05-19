const { Router } = require('express');
const router = Router();
const { createFolder, listFolders, listFolder, deleteFolder, renameFolder } = require('../controllers/folders.controller');

router.get('/', (req, res) => {
    res.json({
        msg: 'get API - controlador'
    });
});

router.post('/createFolder', createFolder);

router.get('/listFolders', listFolders);

router.get('/listFolder', listFolder);

router.delete('/deleteFolder', deleteFolder);

router.patch('/renameFolder', renameFolder);

module.exports = router;