const { Router } = require('express');

const { logeado, register } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', logeado);

router.post('/register', register);

module.exports = router;