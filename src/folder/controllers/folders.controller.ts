import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { accessDir } from '../../utils/baseDir';
import { createFolderService } from '../services/createFolder.service';
import { listFolderService } from '../services/listFolder.service';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const createFolder = (req: Request, res: Response) => {

    const createF = createFolderService(req.user.carpeta, req.body.name);

    if(!createF){
        res.status(400).json({message: "La carpeta no se ha podido crear."});
        return;
    }
    res.status(200).json({message: "La carpeta se ha creado correctamente."});

}

export const listFolder = (req: Request, res: Response, next: NextFunction) => {

    try {
        const list = listFolderService(req.user.carpeta, req.body.name);
        res.status(200).json({
            list
        });
        return;
    } catch (error) {
        next(error);
    }
}

export const deleteFolder = (req: Request, res: Response) => {

    const pathBase = path.join(BASE_DIR, req.user.carpeta);
    const pathBorrar = path.resolve(pathBase, req.body.name);

    // Evita salir del directorio raíz del usuario
    if(!accessDir(pathBase, req.body.name)){ res.status(403).json({msg: 'Acceso denegado'}); return;}

    // Evita borrar la carpeta raíz
    if(pathBorrar == pathBase){ res.json({msg: 'Peticion Denegada.'}); return; }

    // Verifica existencia
    if(!fs.existsSync(pathBorrar)){ res.json({msg: 'Carpeta no encontrada'}); return; }

    fs.rmSync(pathBorrar, {recursive: true});

    res.json({msg: 'Carpeta eliminada correctamente'});
}

export const renameFolder = (req: Request, res: Response) => {

    const resolveOld = path.resolve(BASE_DIR, req.user.carpeta, req.body.name);
    const resolveNew = path.resolve(BASE_DIR, req.user.carpeta, req.body.newName);

    if(resolveOld == resolveNew){
        res.status(400).json({
            msg: 'Intentas ponerle el mismo nombre.'
        });
        return;
    }

    if(!fs.existsSync(resolveOld)){
        res.status(400).json({
            msg: 'La carpeta que intenta renombrar no existe.'
        });
        return;
    }

    const dirOld = path.dirname(resolveOld);
    const dirNew = path.dirname(resolveNew);

    if (dirOld !== dirNew) {
        res.status(400).json({
            msg: 'Solo añada el nuevo nombre de la carpeta'
        });
        return;
    }else{
        fs.renameSync(resolveOld, resolveNew)
        res.json({
            msg: 'Carpeta renombrada correctamente ',
            resolveNew
        });
    }


}
