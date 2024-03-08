import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import {
    validateRegisterInput,
    validateLoginInput,
} from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', validateRegisterInput, registerUser);
router.post('/login', validateLoginInput, loginUser);

export default router;
