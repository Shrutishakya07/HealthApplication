const mongoose = require('mongoose');

const RatingAndReviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    provider: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'Provider',
          required: true 
        },

    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review:{
        type: String,
        required: true,
        maxlength: 500,
        trim: true
    }
});

module.exports = mongoose.model('RatingAndReview', RatingAndReviewSchema);