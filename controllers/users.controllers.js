//this controller is for getting all users, getting a single user
//updating a user and deleting a user

import { StatusCodes } from 'http-status-codes';
import User from '../models/User.Model.js';
import Item from '../models/Item.Model.js';
import { logoutUser } from './auth.controller.js';
import { ForbiddenError, NotFoundError } from '../errors/custom.errors.js';

//get currently logged in user
export const getCurrentUser = async (req, res) => {
    const user = await User.findOne(
        { _id: req.user.userId },
        'username email phone role' //selection of fields to return
    );
    return res.status(StatusCodes.OK).json({ msg: 'current user', user });
};

//get all registered users
export const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.status(StatusCodes.OK).json({ total: users.length, users });
};

//update an existing user
export const updateUser = async (req, res) => {
    //we have used express validator before this route to check if the body is validated
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
    return res
        .status(StatusCodes.OK)
        .json({ msg: 'user Updated', updatedUser });
};

//get application stats, like items total, and users total
export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const items = await Item.countDocuments();
    return res.status(StatusCodes.OK).json({ users, items });
};

//delete a user
export const deleteUser = async (req, res) => {
    const isAdmin = req.user.role === 'admin';
    if (!isAdmin) throw new ForbiddenError('not authorize to delete a user');
    try {
        const user = await User.findById(req.params.id);
        if (user.role !== 'admin') {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            return res
                .status(StatusCodes.OK)
                .json({ msg: 'user deleted', deletedUser });
        }
        throw new ForbiddenError('admin cannot be deleted');
    } catch (error) {
        throw new NotFoundError(error);
    }
};
