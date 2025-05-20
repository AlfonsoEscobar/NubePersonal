
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import  path  from 'path';
import { Response, Request } from "express";

const {leerUsuarios, escribirUsuarios, validateUser} = require('../utils/readUser');
const {passwordHash} = require('../utils/hashPass');

const USERS_FILE = path.join(__dirname, '../db/usuarios.json');
const JWT_SECRET = 'Hu50262025';


const login = async (req:Request, res: Response) => {

    const { email, password } = req.body;

    const usuarios = leerUsuarios();
    const usuario = usuarios.find((u: { email: any; }) => u.email === email);

    if(!usuario){
        return res.status(401).json({ error: 'Usuario o contraseña incorrecto'})
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if(!passwordCorrecta){
        return res.status(401).json({ error: 'Usuario o contraseña incorrecto'})
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

    res.json({
        msg: 'Login correcto',
        token
    });

}

module.exports = {
    login,
}