import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email no válido' }),
  password: z.string().nonempty({message: 'Password requerida'})
});

export const registerSchema = z.object({
    nombre: z.string().min(3, {message: 'El nombre debe de tener al menos 3 caracteres'})
                        .max(50, {message: 'El nombre no debe de tener mas de 50 caracteres'})
                        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Debe contener solo letras' }),

    apellido1: z.string().min(3, {message: 'El apellido1 debe de tener al menos 3 caracteres'})
                            .max(50, {message: 'El nombre no debe de tener mas de 50 caracteres'})
                            .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { message: 'Debe contener solo letras' }),

    apellido2: z.string().optional().or(z.literal('')),

    email: z.string().email({ message: 'Email no válido' }),
    
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
                            .regex(/[A-Z]/, { message: 'Debe tener al menos una mayúscula' })
                            .regex(/[a-z]/, { message: 'Debe tener al menos una minúscula' })
                            .regex(/[0-9]/, { message: 'Debe tener al menos un número' })
})