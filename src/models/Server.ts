
import express from 'express';
import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { errorHandler } from '../error.middleware/errorHandler.middleware';
import { authenticateMid } from '../auth/middleware/auth.middleware';
import { PORT } from '../config/env';

export class Server{
    private app: any;
    private port: string | number;
    private path: string;
    private router = Router();

    /* 
        En el constructor se inicializan todas las variables que se necesitan en esta clase
        y se lanzan las funciones necesarias para que funcione
    */
    constructor(){

        this.app    = express();

        //this.port   = process.env.PORT;
        this.port   = PORT;

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`${req.method} ${req.path}`);
            next();
        });


        // Path para las conexiones
        this.path   = '/api';

        this.middlewares();

        // Se inicializan las rutas que se van a usar
        this.routes();

        // Este middleware se debe de usar despues de las rutas para que funcione bien
        // pero el resto de middleware tienen que ir antes de las rutas por eso saco este
        // del metodo de los middleware
        this.app.use(errorHandler);

    }


    /*
        Esta funcion middlewares() se usa para iniciar los middleware que va a usar express
        en este caso los 'cors' para que no se tengan problemas a la hora de las conexiones desde distintos 
        navegadores,
        'express.json()' para que se pueda leer el json que llega en el body de la peticional servidor,
        'express.static('public')' con esto se usa para servir contenido estatico como una pagina web estatica
    */
    middlewares(){

        // Parseo y lectura del body
        this.app.use(express.json());
        this.app.use(cors());

    }

    /*
        Se usa para poner las rutas que se van a necesitar para haceder a la API 
    */
    routes(){
        // El primer argumento es el String que hara de conexion, el segundo donde se encuentran los middlewares 
        // y el tercero donde se encuentran todas las rutas para asi tenerlas separadas, aqui se pondria si se necesitaran mas rutas para diversos recursos

        this.app.use(this.path + '/folder', [authenticateMid], require('../folder/routes/folder.routes'));

        this.app.use(this.path + '/upload', [authenticateMid], require('../file/routes/upload.routes'));
        
        this.app.use(this.path + '/file',   [authenticateMid], require('../file/routes/file.routes'));

        this.app.use(this.path + '/auth',   [], require('../auth/routes/auth.routes'));

    }

    // Crea la conexion en el puerto indicado y muestra por consola que todo a ido bien
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }

}