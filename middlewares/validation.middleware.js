import { body, validationResult, param } from 'express-validator';
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from '../errors/custom.errors.js';
import { ITEM_CONDITION, ITEM_POSTAGE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Item from '../models/Item.Model.js';
import User from '../models/User.Model.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages);
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

//validate the inputs of items when creating a new item
export const validateItemInput = withValidationErrors([
    body('title')
        .notEmpty()
        .withMessage('title cannot be empty')
        .isLength({ min: 10, max: 50 })
        .withMessage('title can be between 10 and 50 characters long.'),
    body('condition')
        .isIn(Object.values(ITEM_CONDITION))
        .withMessage('invalid condition'),
    body('description')
        .notEmpty()
        .withMessage('description is required')
        .isLength({ min: 20, max: 500 })
        .withMessage('description can be between 20 and 500 characters long'),
    body('category').notEmpty().withMessage('category is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('postage')
        .isIn(Object.values(ITEM_POSTAGE))
        .withMessage('invalid postage'),
]);

//validate the userlogin inputs so we only forward the required fields in the body
export const validateRegisterInput = withValidationErrors([
    body('username').notEmpty().withMessage('username is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError(
                    'user with this email already exist.'
                );
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8, max: 12 })
        .withMessage('password lenght can be between 8 and 12 characters'),
]);

//validate User login inputs
export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email'),
    body('password').notEmpty().withMessage('password is required'),
]);

//validate the item id of mongo when we edit delete or find an id
//without this we cannot give correct error if the id format is incorrect
//we will only use this validation of Id for items only and not users
//so we check if the item id is valid
export const validateIdParam = withValidationErrors([
    param('id').custom(async (id) => {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) throw new BadRequestError('invalid id');

        const item = await Item.findById(id);
        if (!item) throw new NotFoundError(`no job with id : ${id}...`);

        //if the role is admin, which comes from logged in cookie
        const isAdmin = (req.user.role = 'admin');
        const isOwner = req.user.userId === item.createdBy.toString();

        //if the user is not admin or the owner of the item
        //he is not authorized for this item route
        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError('not authorized to access this route');
        }
    }),
]);

//validate the update user inputs so we only forward the required fields in the body
export const validateUpdateUserInput = withValidationErrors([
    body('username').notEmpty().withMessage('username is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError(
                    'user with this email already exist.'
                );
            }
        }),
]);
