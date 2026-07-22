const asyncHandler = require("express-async-handler");

const reviewService = require("../services/review.service");
const ApiResponse = require("../utils/ApiResponse");

// =====================
// Add Review
// =====================

const addReview = asyncHandler(async (req, res) => {
    const review = await reviewService.addReview(
        req.user._id,
        req.params.productId,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            review,
            "Review added successfully."
        )
    );
});

// =====================
// Get Product Reviews
// =====================

const getProductReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getProductReviews(
        req.params.productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            reviews,
            "Reviews fetched successfully."
        )
    );
});

// =====================
// Update Review
// =====================

const updateReview = asyncHandler(async (req, res) => {
    const review = await reviewService.updateReview(
        req.params.reviewId,
        req.user._id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            review,
            "Review updated successfully."
        )
    );
});

// =====================
// Delete Review
// =====================

const deleteReview = asyncHandler(async (req, res) => {
    await reviewService.deleteReview(
        req.params.reviewId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Review deleted successfully."
        )
    );
});

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
};