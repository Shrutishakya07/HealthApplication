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
        if (!user) {
            user = await Provider.findOne({ email: email });
        }
        if (!user) {
            user = await Admin.findOne({ email: email });
        }

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const token = crypto.randomUUID();
        console.log(" Generated Token:", token);
        const updatedDetails = await User.findOneAndUpdate({email:email},
            {token:token, resetPasswordExpires:Date.now() + 5*60*1000},
        {new:true})
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
        const userDetails = await User.findOne({token});
        if(!userDetails){
            return res.status(404).json({message: 'Token not found'});
        }
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({message: 'Token expired'});
        }
        const hashPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate({token:token}, {password:hashPassword, token: null, resetPasswordExpires: null}, {new:true});
        return res.status(200).json({success:true,message:'Password reset successfully'})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Failed to reset password'});
    }
}