import { Router } from "express";

import { listFile, renameFile, deleteFile } from '../controllers/files.controller';
import { validate } from "../middleware/validate.middleware";
import { nameFile, renameValidatorFile } from "../schema/files.schema";

const router = Router();

router.get('/listFile', validate(nameFile), listFile);
router.patch('/renameFile', validate(renameValidatorFile), renameFile);
router.delete('/deleteFile', validate(nameFile), deleteFile);

module.exports = router;