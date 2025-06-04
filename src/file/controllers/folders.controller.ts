import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { accessDir } from '../../utils/baseDir';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const createFolder = (req: Request, res: Response) => {

    const pathBase = path.join(BASE_DIR, req.user.carpeta);

    // Evita salir del directorio raíz del usuario
    if(!accessDir(pathBase, req.body.name)){ res.status(403).json({msg: 'Acceso denegado'}); return;}


    const folderName = req.body.name;

    const fullPath = path.join(pathBase, folderName);

    try{
        
        if(!fs.existsSync(fullPath)){
            fs.mkdirSync(fullPath, {recursive: true});
        }else{
            res.json({
                msg: 'La carpeta ya existe',
                fullPath
            });
        }

        res.json({
            msg: 'Carpeta creada correctamente',
            fullPath
        });
    }catch(error){
        res.status(400).json({
            msg: 'Error al crear la carpeta',
            error
        });
    }

}

export const listFolder = (req: Request, res: Response) => {

    if(!fs.existsSync(path.join(BASE_DIR, req.body.name))){
        res.json({
            msg: 'Carpeta no encontrada'
        });
        return;
    }

    const access = accessDir(BASE_DIR, req.body.name);

    if(!access){
        res.status(403).json({
            msg: 'Acceso denegado'
        });
        return;
    }
    
    const folders = fs.readdirSync(path.join(BASE_DIR, req.body.name));
    
    res.json({
        folders
    });
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
