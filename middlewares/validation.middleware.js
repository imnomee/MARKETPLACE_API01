import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/custom.errors.js';
import { ITEM_CONDITION, ITEM_POSTAGE } from '../utils/constants.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

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
