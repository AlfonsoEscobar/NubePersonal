import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { accessDir } from '../../utils/baseDir';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const createFolder = (req: Request, res: Response) => {

    if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre de la carpeta es requerido con argumento name'
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

    const folderName = req.body.name;

    const fullPath = path.join(BASE_DIR, folderName);

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

export const listFolders = (req: Request, res: Response) => {
    if(!fs.existsSync(path.join(BASE_DIR, req.body.folder))){
		res.status(404).json({
			msg: "Carpeta no encontrada."
		});
		return;
	}

    const folders = fs.readdirSync(BASE_DIR);

    res.json({
        folders
    });
}

export const listFolder = (req: Request, res: Response) => {
    if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre de la carpeta es requerido con argumento name'
        });
        return;
    }

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
    if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre de la carpeta es requerido con argumento name'
        });
        return;
    }

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

    const fullPath = path.join(BASE_DIR, req.body.name);

    fs.rmdirSync(fullPath, {recursive: true});

    res.json({
        msg: 'Carpeta eliminada correctamente'
    });
}

export const renameFolder = (req: Request, res: Response) => {
    if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre de la carpeta es requerido con argumento name'
        });
        return;
    }

    if(!req.body.newName){
        res.status(400).json({
            msg: 'El nuevo nombre de la carpeta es requerido con argumento newName'
        });
        return;
    }

    const resolveOld = path.resolve(BASE_DIR, req.body.name);
    const resolveNew = path.resolve(BASE_DIR, req.body.newName);

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
    }else{
        fs.renameSync(resolveOld, resolveNew)
        res.json({
            msg: 'Carpeta renombrada correctamente ',
            resolveNew
        });
    }


}
