import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import CustomError from "../utils/customeError.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import sendEmail from "../utils/email.js";


// register controller
// @access  public
// route    /api/auth/register

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET,{ expiresIn: '30d'});
}

export const registerController = asyncHandler (async (req,res,next) => {
    const userData = req.body;
    const {email} = userData;
    const existingUser = await User.findOne({email});
    if(existingUser) {
        const error = new CustomError("email already exist please use different email or login instead :", 400);
        return next(error);
    };
    const result = await User.create(userData)    
    const token = signToken(result._id)

    res.status(201).json({
        status:'success',
        message: 'User created successfully',
        token,
        data: result
    });
});



// login controller
// @access  public
// route    /api/auth/login

export const loginController = asyncHandler (async (req,res,next) => {
    const {email,password} = req.body;
    if(!email || !password) {
        const error = new CustomError("Please provide email or password", 400);
        return next(error);
    }else{
        const existingUser = await User.findOne({email}).select('+password');
        if(!existingUser || !(await existingUser.comparePassword(password, existingUser.password))) {
            const error = new CustomError("Invalid email or password user not found.", 404);
            return next(error);
        }
      
       const token = signToken(existingUser._id)    

        res.status(200).json({
            status:'success',
            message: 'User logged in successfully',
            token,
        });
    }

})



// profile controller
// @access  private
// route    /api/auth/profile

export const profileController = asyncHandler (async (req,res,next) => {
    // console.log(req.user)
    const {id} = req.user;
    const user = await User.findById(id);
    if(!user) {
        const error = new CustomError("User not found", 404);
        return next(error);
    }
        res.status(200).json({
            status:'success',
            message: 'profile',
            data: user,
        });

});


// forgot password
// @access private
// route /api/auth/forgotPassword
export const forgotPassword = asyncHandler(async (req,res,next) => {

    // 1. get an email address from the user.
    const { email }= req.body;

    // 2. find the user by email.
    const user = await User.findOne({email});
    if(!user) {
        const error = new CustomError("User not found.", 404);
        return next(error);
    };

    // 3. generate a random email string.
    const resetToken = user.createResetPasswordToken();
    await user.save({validateBeforeSave: false});

    // 4. sending back the string token to the user email.
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/password-reset/${resetToken}`;
    const message = `We have received a reset password request. Please use the below link to reset your password\n\n ${resetUrl} \n\n This reset password link is valid only for 10 minutes.`;
    
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password change request received.',
            message
        });

        res.status(200).json({
            status:'success',
            message: 'Reset password link sent to your email.',
        });
        
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});

        return next(new CustomError("Password reset request failed. Please try again later.",500 ))
    }


});


// password Reset
// @access private
// route /api/auth/passwordReset
export const passwordReset = asyncHandler(async (req,res,next) => {

});

// change password controller
// @access  private
// route    /api/auth/change-password

export const changePasswordController = asyncHandler (async (req,res,next) => {
    // console.log(req.user)
    const {currentPassword, newPassword} = req.body;
    const userId = req.user.id;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
  
        if (!user) {
          const error = new CustomError('user not found', 404);
          return next(error);
        }

        // checking password match
        const passwordMatch = user.comparePassword(currentPassword, user.password);

        if (!passwordMatch) {
          const error = new CustomError('Invalid old password', 404);
          return  next(error);
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Update user's password
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
  
        return  res.status(201).json({
            status:'success',
            message: 'password changed successfully',
        });
      } catch (error) {
        const err =new CustomError ('Error changing password:' + error, 400 );
        return next(err);
      }
       

})