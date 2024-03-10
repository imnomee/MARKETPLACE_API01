// at the start all of these routes are protected under authenticateUser
//so we authenticate and see if the valid cookie is available

import { Router } from 'express';
import { validateUpdateUserInput } from '../middlewares/validation.middleware.js';
import {
    getCurrentUser,
    updateUser,
    deleteUser,
    getApplicationStats,
    getAllUsers,
} from '../controllers/users.controllers.js';
import { authPermissions } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/get-users', authPermissions('admin'), getAllUsers);
router.get('/admin/stats', authPermissions('admin'), getApplicationStats); //admin can get stats
router.patch('/update-user', validateUpdateUserInput, updateUser); //user can update its own record
router.delete('/admin/delete/:id', authPermissions('admin'), deleteUser); //admin can delete

export default router;
