
const path = require('path');

export const accessDir = (BASE_DIR: string, ruta_usuario: string) =>{
    const finalPath = path.resolve(BASE_DIR, ruta_usuario);
    if (!finalPath.startsWith(BASE_DIR)) {
      return false;
    }
    return true;
}
