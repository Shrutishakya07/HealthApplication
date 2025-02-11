const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    email: { type: String, required: true, trim:true },
    password: {type: String, required: true},
    confirmPassword:{
        type: String, 
    },
    contact:{
        type: Number, 
        required: true
    },
    calendly_link: {type: String},
    service:{
        type: String,
        enum: ['medical consulting', 'others'],
        required: true,
        default: 'medical consulting'
    },
    company:{
        type: String,
        trim: true,
    },
    sample:{
        type: String,
    },
    accountType: { type: String, enum: ['user', 'provider','admin'], required: true ,default:'user'},
    token:{
        type:String
    },
    resetPasswordExpires:{
        type: Date,
    },
    image:{
        type: String,
        required: true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required: true,
    },
    
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }]
});
 
module.exports = mongoose.model('User', userSchema);
