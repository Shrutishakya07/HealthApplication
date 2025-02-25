const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const axios = require('axios');  // For making API calls
const ReportAnalysis = require('../models/ReportAnalysis');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
}).single("pdfFile");

const GEMINI_API_KEY = "AIzaSyDTYzRuR1E_opeajPKKnbJmMjyUqhPq2ss";  // Replace with your Gemini API Key

exports.uploadReportAnalysis = async (req, res) => {
    console.log(" Request received at /upload-report");

    upload(req, res, async (err) => {
        if (err) {
            console.error("❌ Multer Error:", err);
            return res.status(500).json({ message: "File upload failed", error: err });
        }

        if (!req.file) {
            console.error("⚠️ No file uploaded");
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { username, contact, userEmail } = req.body;

        if (!username || !contact) {
            return res.status(400).json({ message: "Username and contact are required" });
        }

        try {
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            const fileData = fs.readFileSync(filePath);

            // Extract text from the PDF
            const pdfText = await pdfParse(fileData);
            console.log("📄 Extracted PDF Content:\n", pdfText.text);

            // Generate Medical Summary using Gemini API
            const modifiedQuery = `
                Analyze the following medical report and generate a summary:
                "${pdfText.text}"
                
                Provide the following details:
                - A concise medical summary.
                - Possible deficiency diseases based on the report.
                - Suggested cures, including medications, dietary changes, and yoga techniques.
                
                Ensure the response is formatted clearly and concisely.
            `;

            const gemini_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
            const gemini_payload = {
                "contents": [{ "parts": [{ "text": modifiedQuery }] }]
            };

            const geminiResponse = await axios.post(gemini_url, gemini_payload, {
                headers: { "Content-Type": "application/json" }
            });

            if (geminiResponse.status !== 200) {
                return res.status(500).json({
                    message: "Failed to generate medical summary",
                    status_code: geminiResponse.status,
                    error: geminiResponse.data
                });
            }

            const medicalSummary = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";
            console.log("🩺 Medical Summary from Gemini:", medicalSummary);

            // Save to MongoDB
            const newReport = new ReportAnalysis({
                username,
                contact,
                userEmail,
                pdfFile: {
                    data: fileData,
                    contentType: req.file.mimetype,
                },
                medicalSummary: JSON.stringify(medicalSummary), // Converts object to a string
            });

            await newReport.save();
            console.log("Report saved to MongoDB:", newReport);

            res.status(200).json({
                message: "Report uploaded and processed successfully",
                medicalSummary,
                filename: req.file.filename,
            });

        } catch (error) {
            console.error("❌ Error processing request:", error);
            res.status(500).json({ message: "Failed to process report", error });
        }
    });
};


exports.fetchReport = async (req, res) => {
    try {
        const { email, phone } = req.query; // Get email & phone from request query

        if (!email || !phone) {
            return res.status(400).json({ message: "Email and phone are required" });
        }

        const reports = await ReportAnalysis.find({ userEmail:email,contact:phone  });
        console.log(reports);
        
        if (reports.length === 0) {
            return res.status(404).json({ message: "No reports found" });
        }

        res.status(200).json({ message: "Reports fetched successfully", reports });
    } catch (error) {
        console.error("❌ Error fetching reports:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};