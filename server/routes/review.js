const express = require('express');
const router = express.Router();
const { auth, isUser } = require('../middlewares/auth');
const { createRating, getAverageRating, getAllRatings } = require('../controllers/RatingAndReview');

// Create a rating (Only users should be able to rate providers)
router.post('/rate', auth, isUser, createRating);

// Get average rating of a provider
router.get('/average/:providerId', getAverageRating);

// Get all reviews of a provider
router.get('/all/:providerId', getAllRatings);

module.exports = router;