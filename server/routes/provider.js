const mongoose = require("mongoose");
const express = require('express');
require("dotenv").config();
const axios = require("axios");
const User = require('../models/User')
 const Provider = require('../models/Provider');
const Appointment = require("../models/Appointment");
const router = express.Router();

const{auth, isProvider} = require('../middlewares/auth');
const { uploadFile } = require('../controllers/uploadFile');

router.post('/upload/:appointmentId', auth, isProvider, uploadFile);
//**Set Provider Availability**
router.post("/set-availability", auth, async (req, res) => {
    try {
        const { availability } = req.body; 
        console.log("Received availability:", availability);
        console.log(" Decoded JWT User Data:", req.user); 
        console.log("Looking for provider with ID:", req.user.id);
        if (!availability || !Array.isArray(availability) || availability.length === 0) {
            return res.status(400).json({ message: "Invalid or empty availability data" });
        }
        
        const provider = await Provider.findById(req.user.id);
        console.log("Found Provider:", provider); 
        if (!provider) {
            return res.status(404).json({ message: "Provider not found in database" });
        }

        

        // Store availability in MongoDB
        provider.availability = availability;
        await provider.save();

        res.json({ success: true, message: "Availability updated successfully" ,availability: provider.availability });
    } catch (error) {
        console.error("Error updating availability",error)
        res.status(500).json({sucess:false, message: "Error setting availability",error: error.message });
    }
});

// **Get Provider Availability**
router.get("/availability/:providerId", async (req, res) => {
    try {
        const provider = await User.findById(req.params.providerId);
        if (!provider || provider.accountType !== "provider") {
            return res.status(404).json({ message: "Provider not found" });
        }

        res.json({ success: true, availability: provider.availability });
    } catch (error) {
        res.status(500).json({ message: "Error fetching availability" });
    }
});

// **Get Provider's Booked Appointments**
router.get("/appointments", auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ provider: req.user.id }).populate("user");
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments" });
    }
});

// 2️⃣ **Reschedule Appointment**
router.put("/reschedule/:id", auth, async (req, res) => {
    try {
        const { new_time } = req.body;
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const response = await axios.put(
            `${CALENDLY_USER_URI}/${appointment.CALENDLY_USER_URI}`,
            { start_time: new_time },
            { headers: { Authorization: `Bearer ${CALENDLY_API_KEY}` } }
        );

        appointment.start_time = new_time;
        await appointment.save();

        res.json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ message: "Error rescheduling appointment" });
    }
});

router.get('/test',auth, (req,res) => {
    return res.json({
        success:true,
        message:'protected test route'
    })
});

module.exports = router;