
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import  path  from 'path';

import {leerUsuarios} from '../../utils/readUser';

import { JWT_SECRET } from '../../config/env';

const USERS_FILE = path.join(__dirname, '../../db/usuarios.json');



export const login = async (email: string, password: string) => {

    const usuarios = leerUsuarios();

    const usuario = usuarios.find((u: { email: any; }) => u.email === email);
    if(!usuario){
        const error = new Error('Usuario o contraseña incorrecta');
        (error as any).statusCode = 401;
        throw error;
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if(!passwordCorrecta){
        const error = new Error('Usuario o contraseña incorrecta');
        (error as any).statusCode = 401;
        throw error;
    }

    usuario.ultimaConexion = new Date().toISOString();
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));

    const token = jwt.sign({
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        carpeta: usuario.carpeta
    },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return token;

}
