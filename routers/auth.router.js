import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';
import { validateRegisterInput } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/register', validateRegisterInput, registerUser);
router.post('/login', loginUser);

export default router;
