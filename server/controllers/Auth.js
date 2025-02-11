const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Provider = require('../models/Provider');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
require('dotenv').config();

//create account 
exports.signup = async (req,res) => {
    try{
        const {firstName,lastName,email,password,calendly_link,confirmPassword,contact,
            specialization,qualification,bio,experience,service,company,sample,accountType,image,} = req.body;
            if (!accountType) {
                return res.status(400).json({ success: false, message: "Account type is required" });
            }
    
        const existingUser = await User.findOne({email});
        const existingAdmin = await Admin.findOne({email});
        const existingProvider = await Provider.findOne({email});
        //check if user already exists
        if(existingUser || existingAdmin || existingProvider){
            return res.status(400).json({message: 'User already exists',success:false});
        }
        //make sure the fields are fulfilled
        if (accountType === "user" || accountType === "provider") {
            if (!firstName || !lastName || !email || !password || !confirmPassword || !contact) {
                return res.status(403).json({ success: false, message: "All fields are required" });
            }
        } else if (accountType === "admin") {
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                return res.status(403).json({ success: false, message: "All fields are required for admin" });
            }
        }
        //Both passwords should be matched
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password value does not match, please try again.'
            })
        }
        //hash password
        const hashPassword = await bcrypt.hash(password,10);
        //check account type
        let user
        if (accountType === 'user'){
            //create profile entry in db
        const profileDetails = await Profile.create({
            gender:null,
            phone:null,
            about:null,
        })
        //create new user
        user = await User.create({
            firstName,
            lastName,
            email,
            contact,
            password: hashPassword,
            accountType,
            service,
            ...(service !== 'medical consulting' && {company,sample}),
            image:image || `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            calendly_link,
            additionalDetails: profileDetails._id
        })
        }else if (accountType === 'provider') {
            const profileDetails = await Profile.create({ gender: null, phone: null, about: null,
                qualification: accountType === "provider" ? qualification : "",
                specialization: accountType === "provider" ? specialization : "",
                experience: accountType === "provider" ? experience : 0, });

            user = await Provider.create({
                firstName,
                lastName,
                email,
                contact,
                password: hashPassword,
                accountType,
                specialization,
                experience,
                qualification,
                image:image || `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                bio,
                additionalDetails: profileDetails._id 
            });
        } else if (accountType === 'admin') {
            user = await Admin.create({
                firstName,
                lastName,
                email,
                accountType,
                password: hashPassword,
                image:image || `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid account type' });
        }
        
        //return response
        return res.status(200).json({
            message: 'user successfully created',
            success: true,
            user,
        
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: 'user cannot be registered,please try after some time',
            success: false
        })
    }
}

//login 
exports.login = async (req,res) => {
    try{
        //get data
        const {email,password} = req.body
        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message: 'Please provide email and password'
            })
        }
        //check if user exists and password is correct
        let user = await User.findOne({email}).populate('additionalDetails');
        let userType = 'user';

        if (!user) {
            user = await Provider.findOne({ email });
            userType = 'provider';
        }
        if (!user) {
            user = await Admin.findOne({ email });
            userType = 'admin';
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found, please create an account' });
        }
        //compare password
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:userType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'2h'});
            user.token = token;
            user.password = undefined;
            const options = {
                expires :new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            //create cookie
            return res.cookie('token', token,options).status(200).json({
                success:true,
                user,
                token,
                message:'user logged in successfully'
            });
        }
        else{
            return res.status(401).json({
                success: false,
                message: 'password incorrect'
            })
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            message: 'login failure',
            success: false
        })
    }
}

//logout
exports.logout = async (req, res) => {
    try {
        // Clear the token from cookies
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development', // Secure only in development
            sameSite: 'None', // Helps with cross-site cookie usage
        });

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error(" Error in logout:", error);
        return res.status(500).json({ success: false, message: 'Logout failed' });
    }
};