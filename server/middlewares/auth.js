const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try{
        //get token
        let token =req.cookies.token || req.body.token  || req.header('Authorization');
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1]; // Get the actual token part
        }
        console.log("Extracted Token:", token);
        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message: 'Token is required'
            });
        }
        //verify token
        try{
            const decode  =  jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next();
        }catch{
            return res.status(401).json({
                success: false,
                message: 'Token is invalid'
            });
        }
       
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'something went wrong'});
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{
        if(!req.user || req.user.accountType !== 'admin'){
            return res.status(401).json({
                success: false,
                message: 'Access denied'
            });
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}

exports.isUser = async(req,res,next) =>{
    try{
        if(!req.user || req.user.accountType !== 'user'){
            return res.status(401).json({
                success: false,
                message: 'Access denied'
            });
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}

exports.isProvider = async(req,res,next) => {
    try{
        if(!req.user || req.user.accountType !== 'provider'){
            return res.status(401).json({
                success: false,
                message: 'Access denied'
            });
        }
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
}