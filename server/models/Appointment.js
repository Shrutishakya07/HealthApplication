const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
    calendly_user_uri: {type:String},
    status: { type: String, enum: ['booked', 'canceled','pending'], default: 'pending' },
    start_time: {Date},
    uploadedFiles: [{ type: String }], 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
