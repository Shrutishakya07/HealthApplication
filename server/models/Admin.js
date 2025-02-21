const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim:true,
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
    },
    image:{
        type: String,
        required: true,
    },
    email: { type: String, required: true, trim:true },
    password: {type:String, required: true},
    accountType: { type: String, enum: ['user', 'provider','admin'], required: true ,default:'admin'},
    additionalDetails:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Profile',
                required: true,
            },
    lastLogin: { type: Date },
    isApproved: { type: Boolean, default: false },
    activityLogs: [{ action: String, timestamp: Date }]
});

module.exports = mongoose.model('Admin', adminSchema);
