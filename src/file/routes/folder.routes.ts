
import { Router } from 'express';
import { createFolder, listFolder, deleteFolder, renameFolder } from '../controllers/folders.controller';
import { nameFolder, renameValidatorFolder } from '../schemas/file.schema';
import { validate } from '../middleware/validate.middleware';

export const router = Router();

router.post('/createFolder', validate(nameFolder), createFolder);

router.get('/listFolder', validate(nameFolder), listFolder);

router.delete('/deleteFolder', validate(nameFolder), deleteFolder);

router.patch('/renameFolder', validate(renameValidatorFolder), renameFolder);

module.exports = router;