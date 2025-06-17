import path from 'path';
import fs from 'fs';
import prisma from '../config/prisma';

import { Usuario } from '../models/User';

const USER_FILE = path.join(__dirname, '../db/usuarios.json');

export const leerUsuarios = async () => {

    const data = await prisma.usuario.findMany();

    return data;
}

export const escribirUsuarios = (users: Usuario[]) => {
    try {
        fs.writeFileSync(USER_FILE, JSON.stringify(users));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
