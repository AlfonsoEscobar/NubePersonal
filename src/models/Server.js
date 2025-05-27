const express = require('express');
const cors = require('cors');
//const { errorHandler } = require('../middleware/errorHandler.middleware');

class Server{

    /* 
        En el constructor se inicializan todas las variables que se necesitan en esta clase
        y se lanzan las funciones necesarias para que funcione
    */
    constructor(){

        this.app    = express();
        //this.port   = process.env.PORT;
        this.port   = 3000;

        // Path para las conexiones
        this.path       = '/api';

        // Se usan todos los middleware que se necesitan
        this.middlewares();

        // Se inicializan las rutas que se van a usar
        this.routes();

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
        //this.app.use(errorHandler());

    }

    /*
        Se usa para poner las rutas que se van a necesitar para haceder a la API 
    */
    routes(){
        // El primer argumento es el String que hara de conexion y el segundo donde se encuentran todas las rutas
        // para asi tenerlas separadas, aqui se pondria si se necesitaran mas rutas para diversos recursos

        this.app.use(this.path + '/folder', require('../file/routes/folder.routes'));

        this.app.use(this.path + '/upload', require('../file/routes/upload.routes'));
        
        this.app.use(this.path + '/file', require('../file/routes/file.routes'));

        this.app.use(this.path + '/auth', require('../auth/routes/auth.routes'));

    }

    // Crea la conexion en el puerto indicado y muestra por consola que todo a ido bien
    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }


}



module.exports = Server;