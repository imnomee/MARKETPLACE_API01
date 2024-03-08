import mongoose from 'mongoose';
import { ACCOUNT_TYPE, USER_ROLES } from '../utils/constants.js';

const UserSchema = new mongoose.Schema(
    {
        username: String,
        accountType: {
            type: String,
            enum: Object.values(ACCOUNT_TYPE),
            default: ACCOUNT_TYPE.PERSONAL,
        },
        email: String,
        phone: { type: String, default: '0123456789' },
        address: { type: String, default: 'home' },
        password: String,
        role: {
            type: String,
            enum: Object.values(USER_ROLES),
            default: USER_ROLES.USER,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
