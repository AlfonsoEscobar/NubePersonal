const multer = require('multer');
const path = require('path');
const fs = require('fs');

const BASE_DIR = path.join('D:\\Cursos\\Proyectos\\NubePersonal', 'storage');

const listFile = (req, res) => {

    console.log("Carpeta: ", path.join(BASE_DIR, req.body.folder));

	if(!fs.existsSync(path.join(BASE_DIR, req.body.folder))){
		res.status(404).json({
			msg: "Carpeta no encontrada."
		});
		return;
	}

	const file = fs.readdirSync(path.join(BASE_DIR, req.body.folder));

    console.log("Archivos: ", file);

    res.status(200).json({
        file
    });

}

module.exports = {
    listFile,
}