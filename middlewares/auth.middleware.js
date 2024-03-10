//this middleware will pass if the user is authenticated
//logged in or not
//if yes, they can work on accessing routes
//to veriy the cookie and decrypt the data from it
//we will use cookie-parser in the main index.js
import { ForbiddenError, UnauthorizedError } from '../errors/custom.errors.js';
import { verifyToken } from '../utils/tokenUtils.js';

//authenticate user by the cookie/token
//if the user has a valid cookie and valid token
export const authenticateUser = async (req, res, next) => {
    //access the browser cookies and get the cookie with name  'token'
    //this will work only after cookie-parser is installed
    const { token } = req.cookies;
    if (!token)
        throw new UnauthorizedError('authentication failed. No cookie found');
    // //else go to next route, auth passed

    try {
        //if the token is found, extract the userId and role hidden in it
        const { userId, role } = verifyToken(token);
        //set the user with req
        req.user = { userId, role };
        return next();
    } catch (err) {
        throw new ForbiddenError('invalid token');
    }
};

//validate permissions if the user is admin
export const authPermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('not auth to access this route');
        }
        next();
    };
};
