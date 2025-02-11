const RatingAndReview = require('../models/RatingAndReview');
const Provider = require('../models/Provider');

//create rating
exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { providerId, rating, review } = req.body;
         // Check if provider exists
         const providerExists = await Provider.findById(providerId);
         if (!providerExists) {
             return res.status(404).json({ message: 'Provider not found' });
         }
         //check if its already rated
        const alreadyRated = await RatingAndReview.findOne({user:userId ,provider: providerId })
        if(alreadyRated){
            return res.status(400).json({ message: 'User has already rated this provider' });
        }
        // Create new rating
        const newRating = await RatingAndReview.create({ user: userId,provider: providerId, rating, review });

        // Add rating reference to the provider's profile
        await Provider.findByIdAndUpdate(
            providerId,
            { $push: { RatingAndReview: newRating._id } }, // Push rating to provider's profile
            { new: true }
        );

        return res.status(201).json({
            success:true,
            rating: newRating,
            message: 'Rating created successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const { providerId } = req.params;

        // Check if provider exists
        const providerExists = await Provider.findById(providerId);
        if (!providerExists) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        // Calculate average rating
        const ratings = await RatingAndReview.find({ provider: providerId });
        if (ratings.length === 0) {
            return res.status(200).json({ message: 'No ratings yet', averageRating: 0 });
        }

        const totalRating = ratings.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / ratings.length;

        return res.status(200).json({ success: true, averageRating: averageRating.toFixed(1) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all ratings for a provider
exports.getAllRatings = async (req, res) => {
    try {
        const { providerId } = req.params;

        // Check if provider exists
        const providerExists = await Provider.findById(providerId).populate('RatingAndReview');
        if (!providerExists) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        return res.status(200).json({ success: true, reviews: providerExists.RatingAndReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};