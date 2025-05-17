const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

    const token = req.header('Authentication')?.replace('Bearer ', '');
    if(!token) return res.status(401).json({error: 'No autorizado'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({error: 'Token invalido'});
    }
}


module.exports = {
    authenticate,
}