const User = require('../models/User');
const Provider = require('../models/Provider');
const Admin = require('../models/Admin');
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.forgotPasswordToken = async (req, res) => {
    try{
        const email = req.body.email
        console.log(" Requested Email:", email);  // Log the email to ensure it's correct
        let user = await User.findOne({email: email});
        let userType = "User";
        if (!user) {
            user = await Provider.findOne({ email: email });
            userType = "Provider";
        }
        if (!user) {
            user = await Admin.findOne({ email: email });
            userType = "Admin";
        }

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const token = crypto.randomUUID();
        console.log(" Generated Token:", token);
        let updatedDetails;
        if (userType === "User") {
            updatedDetails = await User.findOneAndUpdate(
                { email },
                { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
                { new: true }
            );
        } else if (userType === "Provider") {
            updatedDetails = await Provider.findOneAndUpdate(
                { email },
                { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
                { new: true }
            );
        } else {
            updatedDetails = await Admin.findOneAndUpdate(
                { email },
                { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
                { new: true }
            );
        }
        const frontendURL = `http://127.0.0.1:4000/reset-password/${token}`; // Change this to match your React app URL

        await mailSender(email, "Password Reset Link", `Click here to reset your password: ${frontendURL}`);


        return res.status(200).json({success:true,message:'email sent successfully'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to generate password reset token'});
    }
}

exports.resetPassword = async (req, res) => {
    try{
        const {password, confirmPassword, token} = req.body
        if(password!==confirmPassword){
            return res.status(400).json({message: 'Passwords do not match'});
        }
        let userDetails = await User.findOne({token});
        let userType = "User";
        if (!userDetails) {
                    userDetails = await Provider.findOne({token});  // Check for provider if not a user
                    userType = "Provider";
                }
        if (!userDetails) {
                userDetails = await Admin.findOne({token});  // Check for admin if not a user
                userType = "Admin";
                }
        if(!userDetails){
                return res.status(404).json({message: 'Token not found'});
                }
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({message: 'Token expired'});
        }
        const hashPassword = await bcrypt.hash(password,10);
        if (userType === "User") {
            await User.findOneAndUpdate(
                { token },
                { password: hashPassword, token: null, resetPasswordExpires: null },
                { new: true }
            );
        } else if (userType === "Provider") {
            await Provider.findOneAndUpdate(
                { token },
                { password: hashPassword, token: null, resetPasswordExpires: null },
                { new: true }
            );
        } else {
            await Admin.findOneAndUpdate(
                { token },
                { password: hashPassword, token: null, resetPasswordExpires: null },
                { new: true }
            );
        }
        return res.status(200).json({success:true,message:'Password reset successfully'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to reset password'});
    }
}