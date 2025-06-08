import path from 'path';
import fs from 'fs';
import { accessDir } from '../../utils/baseDir';

const BASE_DIR = path.join(__dirname, '../..', 'storage');


export const createFolderService = (userFolder: string, nameFolder: string ) => {
    
    const pathBase = path.join(BASE_DIR, userFolder);

    // Evita salir del directorio raíz del usuario
    if(!accessDir(pathBase, nameFolder)){ return false;}

    const fullPath = path.join(pathBase, nameFolder);

    try{
        
        if(!fs.existsSync(fullPath)){
            fs.mkdirSync(fullPath, {recursive: true});
        }else{
            return false;
        }

        return true;
    }catch(error){
        return false;
    }
}