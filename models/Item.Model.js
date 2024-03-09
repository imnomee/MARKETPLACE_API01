import mongoose from 'mongoose';
import { ITEM_CONDITION, ITEM_POSTAGE } from '../utils/constants.js';

const ItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        condition: {
            type: String,
            enum: Object.values(ITEM_CONDITION),
            default: ITEM_CONDITION.USED,
        },
        description: String,
        category: String,
        brand: { type: String, default: 'not provided' },
        model: { type: String, default: 'not provided' },
        color: { type: String, default: 'not provided' },
        price: { type: Number },
        location: {
            type: String,
            default: 'my city',
        },
        postage: {
            type: String,
            enum: Object.values(ITEM_POSTAGE),
            default: ITEM_POSTAGE.COLLECTION,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Item', ItemSchema);

// export const CONDITION = {
//     NEW: 'NEW',
//     LIKE_NEW: 'LIKE_NEW',
//     USED: 'USED',
// };
