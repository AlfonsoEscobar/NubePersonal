const { Router } = require('express');
const router = Router();

const { logeado, register, validateToken } = require('../controllers/auth.controller');


router.post('/login', logeado);

router.post('/register', register);

router.delete('/validateToken', validateToken);


module.exports = router;