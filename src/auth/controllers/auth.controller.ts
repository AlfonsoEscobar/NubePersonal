import { Request, Response } from 'express';

import { login } from '../services/login';
import { registerUser } from '../services/register';


const logeado = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const token = login(email, password);

    res.status(200).json({
        msg: 'Logeado correctamente',
        token
    });
    
}

const register = (req: Request, res: Response) => {
    const user = registerUser(req.body);
    if (!user) {
        return res.status(400).json({
            msg: 'Error al registrar el usuario'
        });
    }
    res.status(200).json({
        msg: 'Usuario registrado correctamente'
    })
}

module.exports = {
    logeado,
    register,
}
