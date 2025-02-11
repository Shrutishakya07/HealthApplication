const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_ley : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })
    }
    catch(err){
        console.error('Failed to connect to Cloudinary:', err);
    }
}