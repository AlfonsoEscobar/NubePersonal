import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/env';

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

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
        req.user = payload;
        
        next();
    } catch (err: any) {
        const error = new Error('Token no válido');
        (error as any).statusCode = 401;
        throw error;
    }
};
