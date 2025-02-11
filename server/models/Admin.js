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
    accountType: { type: String, enum: ['user', 'provider','admin'], required: true ,default:'user'},
    lastLogin: { type: Date },
    activityLogs: [{ action: String, timestamp: Date }]
});

module.exports = mongoose.model('Admin', adminSchema);
