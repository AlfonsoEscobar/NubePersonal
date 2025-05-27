import { Router } from "express";

import { authenticateMid } from '../../auth/middleware/auth.middleware';
import { listFile, renameFile, deleteFile } from '../controllers/files.controller';

const router = Router();

router.get('/listFile', authenticateMid, listFile);
router.patch('/renameFile', renameFile);
router.delete('/deleteFile', deleteFile);

module.exports = router;