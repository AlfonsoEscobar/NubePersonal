import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../services/validateToken';

export const authenticateMid = async(req: Request, res: Response, next: NextFunction) => {
    await verifyToken(req, res, next);
}
