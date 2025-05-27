import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_por_defecto'; // Usa tu secreto real

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('No autorizado');
        (error as any).statusCode = 401;
        throw error;
    }

    const token: string = authHeader.split(' ')[1];


    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        (req as any).user = payload;
        next()
    } catch (err) {
        const error = new Error('Token no valido');
        (error as any).statusCode = 401;
        throw error;
    }
};
