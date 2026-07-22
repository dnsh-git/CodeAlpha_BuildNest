const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
} = require("../controllers/review.controller");

const {
    addReviewValidator,
    updateReviewValidator,
    getProductReviewsValidator,
    deleteReviewValidator,
} = require("../validators/review.validator");

// =====================
// Product Reviews
// =====================

router.post(
    "/products/:productId/reviews",
    protect,
    validate(addReviewValidator),
    addReview
);

router.get(
    "/products/:productId/reviews",
    validate(getProductReviewsValidator),
    getProductReviews
);

// =====================
// Review Management
// =====================

router.put(
    "/reviews/:reviewId",
    protect,
    validate(updateReviewValidator),
    updateReview
);

router.delete(
    "/reviews/:reviewId",
    protect,
    validate(deleteReviewValidator),
    deleteReview
);

module.exports = router;