import { error } from "console";

const {leerUsuarios, escribirUsuarios, validateUser} = require('../../utils/readUser');
const Usuario = require('../../models/User');
const {passwordHash} = require('../../utils/hashPass');
const uuid = require('uuid');
import path from 'path';
import fs from 'fs';

const BASE_DIR = path.join(__dirname, '../..', 'storage');

export const registerUser = (body: any): typeof Usuario => {
    
    const bodyUser = body;

    const usuarios = leerUsuarios();
    
    if(usuarios.length > 0){
        const emailExiste = usuarios.some((element: { email: string; }) => element.email === bodyUser.email);

        if (emailExiste) {
            const error = new Error('El email ya existe.');
        (error as any).statusCode = 409;
        throw error;
        }
    }

    const pass = passwordHash(bodyUser.password);
    const id = uuid.v4();

    const user: typeof Usuario = {
        id: id,
        nombre: bodyUser.nombre,
        apellido1: bodyUser.apellido1,
        apellido2: bodyUser.apellido2 ? bodyUser.apellido2 : '',
        email: bodyUser.email,
        password: pass,
        fechaCreacion: new Date().toLocaleDateString(),
        ultimaConexion: null,
        activo: true,
        rol: 'usuario',
        carpeta: bodyUser.nombre + '_' + id
    }

    usuarios.push(user);
    const userEscrito = escribirUsuarios(usuarios);

    if (!userEscrito) {
        throw error('Error al escribir el usuario');
    }

    const folderName = user.carpeta;

    const fullPath = path.join(BASE_DIR, folderName);
    
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath, {recursive: true});
    }

    return user;
}