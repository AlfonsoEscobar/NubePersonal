import path from 'path';
import fs from 'fs';

import { Usuario } from '../models/User';

const USER_FILE = path.join(__dirname, '../db/usuarios.json');

export const leerUsuarios = () => {

    if (!fs.existsSync(USER_FILE)) {
        return [];
    }

    const info = fs.readFileSync(USER_FILE, 'utf-8');
    if(info == null || info == undefined || info == ''){
        return [];
    }
    const data = JSON.parse(info);
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
