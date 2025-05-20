const uuid = require('uuid');
const path = require('path');

const {leerUsuarios, escribirUsuarios, validateUser} = require('../utils/readUser');
const {passwordHash} = require('../utils/hashPass');
const { login } = require('../services/login');

const logeado = async (req, res) => {

    const { email, password } = req.body;

    const logeado = login(req, res);

    if(logeado){
        res.status(200).json({
            msg: 'Login correcto',
            token
        });
    }else{
        res.status(401).json({
            msg: 'Usuario o contraseña incorrectas',
            token
        });
    }

}

const register = (req, res) => {

    const usuarios = leerUsuarios();
    
    if(usuarios.length > 0){
        const emailExiste = usuarios.some(element => element.email === req.body.email);

        if (emailExiste) {
            return res.status(400).json({
                msg: 'El email ya existe'
            });
        }
    }


    if (!validateUser(req.body)) {
        return res.status(400).json({
            msg: 'Faltan campos obligatorios'
        });
    }

    const pass = passwordHash(req.body.password);

    const id = uuid.v4();

    const user = {
        id: id,
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2 ? req.body.apellido2 : '',
        email: req.body.email,
        password: pass,
        fechaCreacion: new Date().toLocaleDateString(),
        ultimaConexion: new Date().toLocaleDateString(),
        activo: true,
        rol: 'usuario',
        carpeta: req.body.nombre + '_' + id
    }

    usuarios.push(user);
    const userEscrito = escribirUsuarios(usuarios);

    if (!userEscrito) {
        return res.status(500).json({
            msg: 'Error al guardar el usuario'
        });
    }

    return res.status(200).json({
        msg: 'Registro realizado correctamente'
    });

}

const validateToken = (req, res) => {

    res.status().json({
        msg: 'validateToken'
    });

}

module.exports = {
    logeado,
    register,
    validateToken,
}
