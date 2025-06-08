import path from 'path';
import fs from 'fs';
import { accessDir } from '../../utils/baseDir';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const listFolderService = (userFolder: string, folderName: string): string[] => {
    
    const access = accessDir(BASE_DIR, folderName);

    if(!access){
        const error = new Error('Acceso denegado');
        (error as any).statusCode = 403;
        throw error;
    }
    
    if(!fs.existsSync(path.join(BASE_DIR, folderName))){
        const error = new Error('Carpeta no encontrada');
        (error as any).statusCode = 404;
        throw error;
    }

    const folders = fs.readdirSync(path.join(BASE_DIR, folderName));
    
    return folders;
}