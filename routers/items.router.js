import { Router } from 'express';
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
router.route('/').get(getAllItems).post(addItem);

//get an item, update and item & delete and item
router.route('/:id').get(getSingleItem).patch(editItem).delete(deleteItem);

//if we use export default we can import the file with any name
export default router;
