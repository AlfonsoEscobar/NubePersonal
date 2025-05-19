const path = require('path');
const fs = require('fs');

const USER_FILE = path.join(__dirname, '../db/usuarios.json');

const leerUsuarios = () => {
    if (!fs.existsSync(USER_FILE)) {
        return [];
    }
    const info = fs.readFileSync(USER_FILE, 'utf-8');
    const data = JSON.parse(info);
    return data;
}

const validateUser = (body) => {
    if (!body.email || !body.password || !body.nombre || !body.apellido1) {
        return false;
    }
    return true;
}

const escribirUsuarios = (usuarios) => {
    try {
        fs.writeFileSync(USER_FILE, JSON.stringify(usuarios));
    } catch (error) {
        return error;
    }
    return true;
}

module.exports = {
    leerUsuarios,
    escribirUsuarios,
    validateUser,
}