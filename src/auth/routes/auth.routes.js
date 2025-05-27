const { Router } = require('express');
const router = Router();

const { logeado, register, validateToken } = require('../controllers/auth.controller');


router.post('/login', logeado);

router.post('/register', register);

module.exports = router;