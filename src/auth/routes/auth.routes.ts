import { Router } from 'express';

import { logeado, register } from '../controllers/auth.controller';
import {loginSchema, registerSchema} from '../schemas/auth.schema';
import {validate} from '../middleware/login.validate.middleware';

const router = Router();

router.post('/login', validate(loginSchema), logeado);

router.post('/register', validate(registerSchema), register);

module.exports = router;
