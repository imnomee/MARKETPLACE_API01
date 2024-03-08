import Item from '../models/Item.Model.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/custom.errors.js';

//add new item
export const addItem = async (req, res) => {
    const { title, condition, brand, color, price, postage } = req.body;
    const newItem = await Item.create({
        title,
        condition,
        brand,
        color,
        price,
        postage,
    });
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
    const { title, condition, brand, color, price, postage } = req.body;

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
