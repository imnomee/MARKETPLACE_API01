import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        condition: {
            type: String,
            enum: ['new', 'used', 'like-new'],
            default: 'used',
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
            enum: ['delivery', 'collection'],
            default: 'collection',
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
