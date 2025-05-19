const uuid = require('uuid');

const {leerUsuarios, escribirUsuarios, validateUser} = require('../utils/readUser');
const {passwordHash} = require('../utils/hashPass');

const login = (req, res) => {

    res.status().json({
        msg: 'Login'
    });

}

const register = (req, res) => {

    const usuarios = leerUsuarios();
    if(usuarios.array.length !== 0){
        usuarios.array.forEach(element => {
            if (element.email === req.body.email) {
                return res.status(400).json({
                    msg: 'El email ya existe'
                });
            }
        });
    }
    if (!validateUser(req.body)) {
        return res.status(400).json({
            msg: 'Faltan campos obligatorios'
        });
    }

    const pass = passwordHash(req.body.password);

    const user = {
        id: usuarios.array.length + 1,
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2 ? req.body.apellido2 : '',
        email: req.body.email,
        password: pass,
        fechaCreacion: new Date().toLocaleDateString(),
        ultimaConexion: new Date().toLocaleDateString(),
        activo: true,
        rol: 'usuario',
        carpeta: 'carpeta'
    }

    const userEscrito = escribirUsuarios(user);

    if (!userEscrito) {
        return res.status(500).json({
            msg: 'Error al escribir el usuario'
        });
    }

    res.status(200).json({
        msg: 'Register'
    });

}

const validateToken = (req, res) => {

    res.status().json({
        msg: 'validateToken'
    });

}

module.exports = {
    login,
    register,
    validateToken,
}
