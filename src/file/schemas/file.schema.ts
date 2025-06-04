import { z } from 'zod';

export const nameFolder = z.object({
    name: z.string().min(3, {message: 'El nombre debe de tener al menos 3 caracteres'})
                        .max(255, {message: 'El nombre no debe de tener mas de 20 caracteres'})
                        .regex(/^[a-zA-ZñÑ0-9_-]+$/, {message: 'No puede tener caracteres especiales'})
                        .refine(name => name !== '.' && name !== '..', {
                            message: 'Nombre inválido: no puede ser "." o ".."',
                          })
                        .refine(name => !name.startsWith('.'), {
                            message: 'El nombre no puede comenzar con un punto',
                          })
                        .refine(val => !['con', 'nul', 'prn', 'aux', 
                                    'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 
                                    'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9']
                                .includes(val.toLowerCase()), {message: 'Este nombre no está permitido',})
});


export const renameValidatorFolder = z.object({
    name: z.string().min(3, {message: 'El nombre debe de tener al menos 3 caracteres'})
                        .max(255, {message: 'El nombre no debe de tener mas de 20 caracteres'})
                        .regex(/^[a-zA-ZñÑ0-9_-]+$/, {message: 'No puede tener caracteres especiales'})
                        .refine(name => name !== '.' && name !== '..', {
                            message: 'Nombre inválido: no puede ser "." o ".."',
                          })
                        .refine(name => !name.startsWith('.'), {
                            message: 'El nombre no puede comenzar con un punto',
                          })
                        .refine(val => !['con', 'nul', 'prn', 'aux', 
                                    'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 
                                    'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9']
                                .includes(val.toLowerCase()), {message: 'Este nombre no está permitido',}),

    newName: z.string().min(3, {message: 'El nombre debe de tener al menos 3 caracteres'})
                        .max(255, {message: 'El nombre no debe de tener mas de 20 caracteres'})
                        .regex(/^[a-zA-ZñÑ0-9_-]+$/, {message: 'No puede tener caracteres especiales'})
                        .refine(name => name !== '.' && name !== '..', {
                            message: 'Nombre inválido: no puede ser "." o ".."',
                          })
                        .refine(name => !name.startsWith('.'), {
                            message: 'El nombre no puede comenzar con un punto',
                          })
                        .refine(val => !['con', 'nul', 'prn', 'aux', 
                                    'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9', 
                                    'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9']
                                .includes(val.toLowerCase()), {message: 'Este nombre no está permitido',})
});
