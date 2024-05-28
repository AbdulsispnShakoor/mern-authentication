import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email.']
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select:false
    },
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetExpires: Date
},{timestamps: true});


// encrypting the password
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    try {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password =  hashedPassword;
        return next();
    } catch (error) {
        console.log(error)
        next(error);
    }

});


userSchema.methods.comparePassword = async function validatePassword(pswd, pswdDB) {
   return await bcrypt.compare(pswd,pswdDB)
};



// check if the password change  
userSchema.methods.isPasswordChange = async function (JWT_Timestamp){
    if(this.passwordChangedAt){
        const pswdChangedTimeStamps = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        // console.log(pswdChangedTimeStamps, JWT_Timestamp);
        return JWT_Timestamp < pswdChangedTimeStamps
    }
    return false;
};


userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    // console.log(resetToken, this.passwordResetToken);

    return resetToken;
}
export const User = mongoose.model("User", userSchema);