
import { Request, Response, Router } from 'express';
import { createFolder, listFolder, deleteFolder, renameFolder } from '../controllers/folders.controller';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        msg: 'get API - controlador'
    });
});

router.post('/createFolder', createFolder);

router.get('/listFolder', listFolder);

router.delete('/deleteFolder', deleteFolder);

router.patch('/renameFolder', renameFolder);

module.exports = router;