import path from 'path';
import fs from 'fs';

import { Usuario } from '../models/User';

const USER_FILE = path.join(__dirname, '../db/usuarios.json');

const leerUsuarios = () => {

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

const validateUser = (user: Usuario) => {
    if (user == null || !user.email || !user.password || !user.nombre || !user.apellido1) {
        return false;
    }
    return true;
}

const escribirUsuarios = (users: Usuario[]) => {
    try {
        fs.writeFileSync(USER_FILE, JSON.stringify(users));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    leerUsuarios,
    escribirUsuarios,
    validateUser,
}