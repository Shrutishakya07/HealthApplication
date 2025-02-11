const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type:String
    },
    phone:{
        type:Number,
        trim:true
    },
    about:{
        type:String,
        trim:true
    },

  qualification: { type: String, default: "" },
  specialization: { type: String, default: "" },
  experience: { type: Number, default: 0 }
});

module.exports = mongoose.model('Profile', profileSchema);
