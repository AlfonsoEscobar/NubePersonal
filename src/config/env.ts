// src/config/env.ts
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Falta la variable JWT_SECRET en el archivo .env');
}

export const JWT_SECRET = process.env.JWT_SECRET;
