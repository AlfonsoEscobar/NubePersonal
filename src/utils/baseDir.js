
const path = require('path');

const accessDir = (BASE_DIR, ruta_usuario) =>{
    const finalPath = path.resolve(BASE_DIR, ruta_usuario);
    if (!finalPath.startsWith(BASE_DIR)) {
      
      // Añadir un mensaje como de "Operacion Denegada"

      return false;
    }
    return true;
}

module.exports = {
    accessDir
}