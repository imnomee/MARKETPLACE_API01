import 'express-async-errors';
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

//cookie parser
import cookieParser from 'cookie-parser';
app.use(cookieParser());

//routes
import { authenticateUser } from './middlewares/auth.middleware.js';
//if the user is logged in, they can go through item Routes
//all item routes, including, get, create, patch and delete
import itemsRouter from './routers/items.router.js';
app.use('/api/v1/items', authenticateUser, itemsRouter);

import authRouter from './routers/auth.router.js';
app.use('/api/v1/auth', authRouter);

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
import errorHandlingMiddleware from './middlewares/errorHandling.middleware.js';
app.use(errorHandlingMiddleware);

//server settings
const PORT = process.env.PORT || 5100;
//mongoose settings
//if no errorrs, we are connected with DB
import mongoose from 'mongoose';
import { cookie } from 'express-validator';
try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}...`);
    });
} catch (err) {
    console.log(err);
    //if any error exit the process
    process.exit(1);
}
