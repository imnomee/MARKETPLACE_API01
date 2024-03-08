//this file holds the register and login authorization methods
import User from '../models/User.Model.js';
import { StatusCodes } from 'http-status-codes';

//register new user
export const registerUser = async (req, res) => {
    //if the user collection size is 0, its the first account
    //so we will set the first account as an Admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    const newUser = await User.create(req.body);
    return res
        .status(StatusCodes.CREATED)
        .json({ msg: 'user created', newUser });
};

//login user
export const loginUser = async (req, res) => {
    return res.send('login');
};
