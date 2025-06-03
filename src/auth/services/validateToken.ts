import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../../models/TokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'Hu50262025'; // Usa tu secreto real

const verifyJwt = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return reject(err);
            resolve(decoded);
        });
    });
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('No autorizado');
        (error as any).statusCode = 401;
        throw error;
    }

    const token: string = authHeader.split(' ')[1];

    try {
        const payload = await verifyJwt(token, JWT_SECRET);
        req.body.user = payload;
        next();
    } catch (err: any) {

        const error = new Error('Token no válido');
        (error as any).statusCode = 401;
        throw error;
    }
};
