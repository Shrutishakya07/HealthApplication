const express = require('express');
require("dotenv").config();

const router = express.Router();

const {getPendingProviders, approveProvider, rejectProvider} = require("../controllers/Auth")

router.get('/providers/pending-providers', getPendingProviders);
router.put('/providers/:id/approve', approveProvider);
router.delete('/providers/:id/reject', rejectProvider);

module.exports = router;
