const { Router } = require('express');
const router = Router();

const { login, register, validateToken } = require('../controllers/auth');


router.get('/login', login);

router.patch('/register', register);

router.delete('/validateToken', validateToken);


module.exports = router;