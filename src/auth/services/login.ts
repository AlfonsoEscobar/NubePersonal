
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import  path  from 'path';
import prisma from '../../config/prisma';

import { JWT_SECRET } from '../../config/env';

export const login = async (email: string, password: string) => {

    const usuario = await prisma.usuario.findUnique({where: {email}});

    if(!usuario){
        const error = new Error('Usuario o contraseña incorrecta');
        (error as any).statusCode = 401;
        throw error;
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if(!passwordCorrecta){
        const error = new Error('Usuario o contraseña incorrecta');
        (error as any).statusCode = 401;
        throw error;
    }

    usuario.ultimaConexion = new Date();
    await prisma.usuario.update({
        where: { email },
        data: {
          ultimaConexion: new Date()
        }
      });

    const token = jwt.sign({
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        carpeta: usuario.carpeta
    },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    return token;

}
