const express = require('express');
const router = express.Router();
const { auth, isUser } = require('../middlewares/auth');
const { uploadReportAnalysis, fetchReport } = require('../controllers/ReportAnalysis');

// Route for PDF Upload
router.post('/upload-report', uploadReportAnalysis);
router.get("/fetch-report", fetchReport); // Define the route


module.exports = router;

