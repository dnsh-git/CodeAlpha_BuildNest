const { body, param } = require("express-validator");

const addReviewValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ max: 1000 })
        .withMessage("Comment cannot exceed 1000 characters"),
];

const updateReviewValidator = [
    param("reviewId")
        .isMongoId()
        .withMessage("Invalid Review ID"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ max: 1000 })
        .withMessage("Comment cannot exceed 1000 characters"),
];

const getProductReviewsValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid Product ID"),
];

const deleteReviewValidator = [
    param("reviewId")
        .isMongoId()
        .withMessage("Invalid Review ID"),
];

module.exports = {
    addReviewValidator,
    updateReviewValidator,
    getProductReviewsValidator,
    deleteReviewValidator,
};