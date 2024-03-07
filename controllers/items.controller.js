//internal items for testing
import { nanoid } from 'nanoid';
import { items } from '../items.js';

//this file holds the function we use to process requests
//passed to the items router

export const getAllItems = (req, res) => {
    return res.status(200).json({ length: items.length, items });
};

export const addItem = (req, res) => {
    const { title, condition, brand, color, price, postage } = req.body;
    if (!title || !condition || !brand || !color || !price || !postage) {
        return res
            .status(400)
            .json({ msg: 'please provide all the required details' });
    }
    //generate a random 10 characters nanoid
    const id = nanoid(10);
    const newItem = { id, title, condition, brand, color, price, postage };
    items.push(newItem);
    return res
        .status(201)
        .json({ totla: items.length, msg: 'item added', newItem });
};

export const getSingleItem = (req, res) => {
    //find the job by id, that comes from the params
    //req.params holds the item provided in url
    const { id } = req.params;
    const item = items.find((it) => it.id === id);
    if (!item) {
        return res.status(404).json({ msg: `no item with the id: ${id}...` });
    }

    return res.status(200).json(items);
};

export const editItem = (req, res) => {
    const { title, condition, brand, color, price, postage } = req.body;

    const { id } = req.params;
    const item = items.find((it) => it.id === id);
    if (!item) {
        return res.status(404).json({ msg: `no item with the id: ${id}...` });
    }

    item.title = title;
    item.condition = condition;
    item.brand = brand;
    item.color = color;
    item.price = price;
    item.postage = postage;

    return res.status(200).json({ msg: 'item updated', item });
};

export const deleteItem = (req, res) => {
    const { id } = req.params;
    const deletedItem = items.find((it) => it.id === id);
    if (!deletedItem) {
        return res.status(404).json({ msg: `no item with the id: ${id}...` });
    }
    //filter out the items and remove the ones provided
    const newItems = items.filter((it) => it.id !== id);
    //set the filtered items to the default one
    //this wont work here because we have imported the items array
    //unless the array is in the same file, it won't let us assign
    //filteredarray to the imported array
    items = newItems;
    return res.status(200).json({ msg: 'item deleted', deletedItem });
};
