import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: true, message: 'Datos inválidos', detalles: result.error.errors });
    return;
  }
  req.body = result.data;
  next();
};