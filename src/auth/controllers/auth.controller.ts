import { NextFunction, Request, Response } from 'express';

import { login } from '../services/login';
import { registerUser } from '../services/register';


export const logeado = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    try {

        const token = await login(email, password);
        res.status(200).json({ msg: 'Logeado correctamente.', token });
        return;
    } catch (error) {
        next(error);
    }
}

export const register = (req: Request, res: Response) => {
    const user = registerUser(req.body);

    if (!user) { res.status(400).json({ msg: 'Error al registrar el usuario' }); return; }
    
    res.status(200).json({ msg: 'Usuario registrado correctamente', user });

    return;
}
