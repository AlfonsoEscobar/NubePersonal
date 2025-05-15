const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.join(__dirname, '..', 'storage');

const listFile = (req, res) => {

	if(!fs.existsSync(path.join(BASE_DIR, req.body.folder))){
		res.status(404).json({
			msg: "Carpeta no encontrada."
		});
		return;
	}

	const file = fs.readdirSync(path.join(BASE_DIR, req.body.folder));

    res.status(200).json({
        file
    });

}

const renameFile = (req, res) => {

	if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre del archivo es requerido con argumento name'
        });
        return;
    }

    if(!req.body.newName){
        res.status(400).json({
            msg: 'El nuevo nombre del archivo es requerido con argumento newName'
        });
        return;
    }

	const resolveOld = path.resolve(BASE_DIR, req.body.name);
    const resolveNew = path.resolve(BASE_DIR, req.body.newName);

    if(!fs.existsSync(resolveOld)){
        res.status(400).json({
            msg: 'El archivo que intenta renombrar no existe.'
        });
        return;
    }

    const dirOld = path.dirname(resolveOld);
    const dirNew = path.dirname(resolveNew);

    if (dirOld !== dirNew) {
        res.status(400).json({
            msg: 'Solo añada el nuevo nombre del archivo'
        });
    }else{
        fs.renameSync(resolveOld, resolveNew)
        res.json({
            msg: 'Archivo renombrada correctamente ',
            resolveNew
        });
    }

}

const deleteFile = (req, res) => {

	if(!req.body.name){
        res.status(400).json({
            msg: 'El nombre de la carpeta es requerido con argumento name'
        });
        return;
    }

    if(!fs.existsSync(path.join(BASE_DIR, req.body.name))){
        res.json({
            msg: 'Carpeta no encontrada'
        });
        return;
    }

    const access = accessDir(BASE_DIR, req.body.name);

    if(!access){
        res.status(403).json({
            msg: 'Acceso denegado'
        });
        return;
    }

    const fullPath = path.join(BASE_DIR, req.body.name);

    fs.unlinkSync(fullPath);

    res.json({
        msg: 'Carpeta eliminada correctamente'
    });
}

module.exports = {
    listFile,
	renameFile,
	deleteFile,
}