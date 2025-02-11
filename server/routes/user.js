const express = require('express');
require("dotenv").config();

const router = express.Router();

const {login,signup,logout} = require('../controllers/Auth');
const{auth,isProvider,isUser,isAdmin} = require('../middlewares/auth');
const{forgotPasswordToken, resetPassword} = require('../controllers/ResetPassword');
const {availableSlots,bookSlot,deleteAppointment} = require('../controllers/Availability');
const { downloadFile } = require('../controllers/uploadFile');

router.get('/download/:appointmentId', auth, isUser, downloadFile);

router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router.post('/forgot-password', forgotPasswordToken);
router.post('/reset-password',resetPassword);
router.get('/availability',availableSlots);
router.post('/book',auth,bookSlot);
router.delete('/cancel/:id', deleteAppointment);

router.get('/test',auth, (req,res) => {
    return res.json({
        success:true,
        message:'protected test route'
    })
});
router.get('/user',auth,isUser, (req,res) => {
    return res.json({
        success:true,
        message:'protected customer route'
    })
});
router.get('/provider',auth,isProvider, (req,res) => {
    return res.json({
        success:true,
        message:'protected provider route'
    })
});
router.get('/admin',auth,isAdmin, (req,res) => {
    return res.json({
        success:true,
        message:'protected admin route'
    })
});

module.exports = router;
