import { Router } from "express";

import { listFile, renameFile, deleteFile } from '../controllers/files.controller';

const router = Router();

router.get('/listFile', listFile);
router.patch('/renameFile', renameFile);
router.delete('/deleteFile', deleteFile);

module.exports = router;