const cloudinary = require('cloudinary').v2
const Appointment = require('../models/Appointment');

exports.uploadFile = async (req, res) => {
    try {
        const providerId = req.user.id;
        const { appointmentId } = req.params;

        // Find the appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Ensure the provider owns this appointment
        if (appointment.provider.toString() !== providerId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        // Check if a file is uploaded
        if (!req.files || !req.files.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadedFile = req.files.file;

        // Upload file to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
            resource_type: 'auto',
            folder: 'provider_files'
        });

        // Save file URL in the appointment
        appointment.uploadedFiles.push(cloudinaryResponse.secure_url);
        await appointment.save();

        return res.status(200).json({ success: true, message: 'File uploaded successfully', fileUrl: cloudinaryResponse.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'File upload failed' });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { appointmentId } = req.params;

        // Find the appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        // Ensure the user booked this appointment
        if (appointment.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        return res.status(200).json({ success: true, fileLinks: appointment.uploadedFiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving file links' });
    }
};