import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // La carpeta del usuario (suponiendo que `userFolder` es algo que mandas en la petición)
        const userFolder = path.basename(req.body.userFolder);
        const folderPath = path.resolve(BASE_DIR, userFolder);
    
        // Asegúrate de que la carpeta existe, sino, créala
        fs.mkdirSync(folderPath, { recursive: true });
    
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        // Genera un nombre único para evitar sobrescribir
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); 
        cb(null, uniqueSuffix + fileExtension);
    }
});
  
// Filtro de archivo (solo imágenes)
const fileFilter = (req: any, file: any, cb: any) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (validExtensions.includes(ext)) {
      cb(null, true);  // Permite el archivo
    } else {
      cb(new Error('Archivo no válido. Solo se permiten imágenes'), false);  // Rechaza el archivo
    }
};
  
// Configuración de multer
export const upload = multer({ storage: storage, fileFilter: fileFilter });

export const uploadImage = (req: Request, res: Response) => {
    
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha subido ninguna imagen.' });
    }
 
    res.json({
      message: 'Archivo subido correctamente',
      file: req.file
    });
}
