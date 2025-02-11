const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
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
    contact:{
        type: Number, 
        required: true
    },
    accountType: { type: String, enum: ['user', 'provider','admin'], required: true ,default:'user'},
    calendly_link: {type: String},
    email: { type: String, required: true, trim:true },
    password: {type: String, required: true},
    specialization: { type: String ,required: true},
    experience: { type: Number,required: true, min: 0 },
    qualification: { type: String ,required: true},
    RatingAndReview: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReview'
    }],
    bio: { type: String },
    additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile',
            required: true,
        },
    image:{
        type: String,
        required: true,
    },
    availability: [{ day: String, slots: [String] }],
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
    
});

module.exports = mongoose.model('Provider', providerSchema);
