//this file holds only the register and login authorization and logout methods

import User from '../models/User.Model.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { ForbiddenError, UnauthorizedError } from '../errors/custom.errors.js';
import { createToken } from '../utils/tokenUtils.js';

//register new user
export const registerUser = async (req, res) => {
    //if the user collection size is 0, its the first account
    //so we will set the first account as an Admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    return res
        .status(StatusCodes.CREATED)
        .json({ msg: 'user created', newUser });
};

//login user
export const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new ForbiddenError('no user found with that email');
    const isPassOk = await comparePassword(req.body.password, user.password);
    if (!isPassOk) throw new UnauthorizedError('invalid username or password');

    //generate token and send it within the cookie
    //we have passed userId and userRole in the token
    //so when we need to verify token, we will decrypt and get the data
    const token = createToken({ userId: user._id, role: user.role });
    //cookie expiry is calculated in ms. so we get one day ms first
    const oneDay = 1000 * 60 * 60 * 24;
    //send cookie with ('name', value, {options})
    //if the secure if true, it won't work in dev envoirment
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(StatusCodes.OK).json({
        msg: 'user logged in, check the cookie with name token',
    });
};

export const logoutUser = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    return res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
