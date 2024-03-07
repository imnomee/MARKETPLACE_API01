import express from 'express';
const app = express();

//makes the app accept .env commands from .env files
import * as dotenv from 'dotenv';
dotenv.config();

//morgan shows the methods used to send or recieve data in console
import morgan from 'morgan';
app.use(morgan('dev'));

//makes the app accept json
app.use(express.json());

//internal items for testing
import { items } from './items.js';
import { nanoid } from 'nanoid';

//routes
app.get('/', (req, res) => {
    return res.json({ msg: 'data received', data: req.body });
});
//get all items
app.get('/api/v1/items', (req, res) => {
    return res.status(200).json({ length: items.length, items });
});

//add an item
app.post('/api/v1/items', (req, res) => {
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
});

//get single item
app.get('/api/v1/items/:id', (req, res) => {
    //find the job by id, that comes from the params
    //req.params holds the item provided in url
    const { id } = req.params;
    const item = items.find((it) => it.id === id);
    if (!item) {
        return res.status(404).json({ msg: `no item with the id: ${id}...` });
    }

    return res.status(200).json(items);
});

//edit an item
app.patch('/api/v1/items/:id', (req, res) => {
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
});

//delete an item
app.delete('/api/v1/items/:id', (req, res) => {
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
});

//not found middleware
//this middleware runs when the route entered is not found in the app
//page not found, undefined route etc
// handle requests for non-existent routes
//api/v1/itemssss
app.use('*', (req, res) => {
    return res.status(404).json({ msg: 'page not found' });
});

//Error middleware
//this middleware runs when any error occur during the processing of requests.
//unexpected errors, server errors, mongo errors,

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ msg: 'something went wrong' });
});

//server settings
const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}...`);
});
