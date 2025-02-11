const express = require('express');
const router = express.Router();

const { auth } = require('../middlewares/auth');
const {updateProfile, deleteAccount, getProfile} = require('../controllers/Profile')

router.delete('/deleteAccount',auth,deleteAccount);
router.put('/updateProfile',auth,updateProfile);
router.get('/getProfile',auth,getProfile);

module.exports = router;
