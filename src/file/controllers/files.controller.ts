import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import { accessDir } from '../../utils/baseDir';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const listFile = (req: Request, res: Response) => {

	if(!fs.existsSync(path.join(BASE_DIR, req.body.folder))){ res.status(404).json({ msg: "Carpeta no encontrada." }); return; }

	const file = fs.readdirSync(path.join(BASE_DIR, req.body.folder));

    res.status(200).json({ file });

    return;

}

export const renameFile = (req: Request, res: Response) => {

	const resolveOld = path.resolve(BASE_DIR, req.body.name);
    const resolveNew = path.resolve(BASE_DIR, req.body.newName);

    if(!fs.existsSync(resolveOld)){ res.status(400).json({ msg: 'El archivo que intenta renombrar no existe.' }); return; }

    const dirOld = path.dirname(resolveOld);
    const dirNew = path.dirname(resolveNew);

    if (dirOld !== dirNew) {
        res.status(400).json({ msg: 'Solo añada el nuevo nombre del archivo' });
        return;
    }else{
        fs.renameSync(resolveOld, resolveNew);
        res.json({ msg: 'Archivo renombrada correctamente ', resolveNew });
        return;
    }

}

export const deleteFile = (req: Request, res: Response) => {

    if(!fs.existsSync(path.join(BASE_DIR, req.body.name))){ res.json({ msg: 'Carpeta no encontrada' }); return; }

    const access = accessDir(BASE_DIR, req.body.name);

    if(!access){ res.status(403).json({ msg: 'Acceso denegado' }); return; }

    const fullPath = path.join(BASE_DIR, req.body.name);

    fs.unlinkSync(fullPath);

    res.json({ msg: 'Carpeta eliminada correctamente' });
    return;
}
