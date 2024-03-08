//this file holds the register and login authorization methods
import User from '../models/User.Model.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { ForbiddenError, UnauthorizedError } from '../errors/custom.errors.js';

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
    return res.send({ msg: 'user found', user });
};
