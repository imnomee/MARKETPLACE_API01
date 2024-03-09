//this middleware will pass if the user is authenticated
//logged in or not
//if yes, they can work on accessing routes
//to veriy the cookie and decrypt the data from it
//we will use cookie-parser in the main index.js
import { ForbiddenError, UnauthorizedError } from '../errors/custom.errors.js';
import { verifyToken } from '../utils/tokenUtils.js';

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
        console.log(req.user);
        return next();
    } catch (err) {
        throw new ForbiddenError('invalid token');
    }
};
