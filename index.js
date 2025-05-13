const Server = require('./models/Server');

// Creamos una instancia de la clase Server que es donde esta la logica para crear el servidor
const ser = new Server();

// Con esto ponemos a la escucha el servidor y estaria levantado
ser.listen();