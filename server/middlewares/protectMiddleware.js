import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/AsyncHandler.js';
import CustomError from '../utils/customeError.js';
import  util from 'util'


export const protectMiddleware =asyncHandler(async(req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return next(new CustomError('Not Authorized',401));
    }
    try {
        const decoded =await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(new CustomError(401, 'Not Authorized'));
    }
})