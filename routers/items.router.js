import { validateItemInput } from '../middlewares/validation.middleware.js';
import { Router } from 'express';
import { validateIdParam } from '../middlewares/validation.middleware.js';
import {
    addItem,
    deleteItem,
    editItem,
    getAllItems,
    getSingleItem,
} from '../controllers/items.controller.js';

//if we export it while assigning,
//we will have to import it as an object
// export const router = Router();
const router = Router();

//get all items & add an item
router.route('/').get(getAllItems).post(validateItemInput, addItem);

//get an item, update and item & delete and item
router
    .route('/:id')
    .get(validateIdParam, getSingleItem)
    .patch(validateIdParam, editItem)
    .delete(validateIdParam, deleteItem);

//if we use export default we can import the file with any name
export default router;
