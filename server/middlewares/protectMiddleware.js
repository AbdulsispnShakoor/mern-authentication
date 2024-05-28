import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/AsyncHandler.js';
import CustomError from '../utils/customeError.js';
import  util from 'util'
import { User } from '../models/user.model.js';


export const protectMiddleware =asyncHandler(async(req,res,next) => {
    // debugger;
    // const authHeader = req.headers['Authorization'];
    const authHeader = req.headers.authorization;
    
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if(!token) {
        return next(new CustomError('Not Authorized',401));
    }
    try {
        const decoded =await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
        // console.log(decoded.id)

        // checking if the user exist 
        const user = await User.findById(decoded?.id);
        // console.log(user)
        if(!user) {
            return next(new CustomError('Not Authorized',401));
        }

        // check if the user changed their password after the token was issued
        const isPswdChanged = await user.isPasswordChange(decoded.iat);
       if(isPswdChanged){
        return next(new CustomError('password has recently changed, please login again',401));
       }

        req.user = user;
        next();
    } catch (error) {
        next(new CustomError(401, 'Not Authorized'));
    }
});

export const restriction = (role) =>{
    return (req,res,next) => {
        if(req.user.role !== role){
            return next(new CustomError('You do not have the permission to perform this action',403));
        }
        next();
    }
}