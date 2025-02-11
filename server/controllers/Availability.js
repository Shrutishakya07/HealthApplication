const User = require('../models/User');
const Provider = require('../models/Provider');
const Appointment = require("../models/Appointment");
const axios = require('axios');
require('dotenv').config();

const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY;
const CALENDLY_USER_URI = process.env.CALENDLY_USER_URI;

// show available slots
exports.availableSlots = async(req, res) => {
    try{
        const providers = await Provider.find({
            availability: { $exists: true, $ne: [] } // Excludes providers with empty availability
        }).select("firstName lastName availability calendly_link");
        console.log("Fetched Providers:", providers);
        return res.json({ success: true, providers });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching slots' });
    }
}

// book a slot for a specific user and provider
exports.bookSlot = async(req, res) => {
    try{
        const { provider_id, start_time } = req.body;

        const provider = await Provider.findById(provider_id);
        if (!provider ) {
            return res.status(400).json({ message: "Invalid provider" });
        }
        if (!provider.calendly_link) {
            return res.status(400).json({ success: false, message: "Provider has no Calendly link" });
        }
        const response = await axios.post(
            "https://api.calendly.com/scheduled_events",
            {
                event_type: provider.calendly_link,
                invitee: { email: req.user.email, firstName: req.user.firstName },
                start_time,
            },
            {
                headers: { Authorization: `Bearer ${CALENDLY_API_KEY}` }
            }
        );
        //  Log the full response from Calendly
            console.log("Calendly API Response:", JSON.stringify(response.data, null, 2));

            // Check if `resource` exists before accessing `.uri`
            if (!response.data || !response.data.resource || !response.data.resource.uri) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to book slot. Calendly API did not return a valid response."
                });
            }

        const appointment = await Appointment.create({
            user: req.user.id,
            provider: provider_id,
            calendly_event_uri: response.data.resource.uri,
            start_time,
        });

        res.json({ success: true, appointment });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error booking slot' });
    }
}

// cancel an appointment
exports.deleteAppointment = async(req, res) => {
    try{
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        await axios.delete(`${CALENDLY_USER_URI}/${appointment.CALENDLY_USER_URI}`, {
            headers: { Authorization: `Bearer ${CALENDLY_API_KEY}` }
        });

        appointment.status = "canceled";
        await appointment.save();

        res.json({ success: true, message: "Appointment canceled" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting appointment' });
    }
}
