const mongoose = require('mongoose');

const ReportAnalysisSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    contact: { type: String, required: true },
    userEmail:{
        type: String, required: true, trim: true
    },
    pdfFile: {
        data: Buffer,
        contentType: String
    },
    medicalSummary: { 
        type: String, 
        required: true // ✅ Ensuring that the summary is always saved
    }
}, { timestamps: true });

module.exports = mongoose.model('ReportAnalysis', ReportAnalysisSchema);
