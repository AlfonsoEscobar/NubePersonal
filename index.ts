
import { Server } from './src/models/Server';

// Creamos una instancia de la clase Server que es donde esta la logica para crear el servidor
const server = new Server();

// Con esto ponemos a la escucha el servidor y estaria levantado
server.listen();