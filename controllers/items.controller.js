import Item from '../models/Item.Model.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/custom.errors.js';

//add new item
export const addItem = async (req, res) => {
    //when we are creating/adding the item,
    //there is no way to set who created the item.
    //so we get the userId from the cookie/token we created when user logged in
    //and add that userId with the item
    req.body.createdBy = req.user.userId;
    const newItem = await Item.create(req.body);
    return res.status(StatusCodes.CREATED).json(newItem);
};

//get all items
export const getAllItems = async (req, res) => {
    const items = await Item.find();
    return res.status(StatusCodes.OK).json({ length: items.length, items });
};

//get single item
export const getSingleItem = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);

    return res.status(StatusCodes.OK).json(item);
};

//edit item
export const editItem = async (req, res) => {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    return res
        .status(StatusCodes.OK)
        .json({ msg: 'item updated', updatedItem });
};

//delete item
export const deleteItem = async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    return res
        .status(StatusCodes.OK)
        .json({ msg: 'item deleted', deletedItem });
};
