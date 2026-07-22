const Review = require("../models/review.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const updateProductRating = async (productId) => {
    const reviews = await Review.find({ product: productId });

    const numReviews = reviews.length;

    const rating =
        numReviews === 0
            ? 0
            : reviews.reduce((sum, review) => sum + review.rating, 0) /
              numReviews;

    await Product.findByIdAndUpdate(productId, {
        rating: Number(rating.toFixed(1)),
        numReviews,
    });
};

const addReview = async (userId, productId, reviewData) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const existingReview = await Review.findOne({
        user: userId,
        product: productId,
    });

    if (existingReview) {
        throw new ApiError(
            400,
            "You have already reviewed this product."
        );
    }

    const review = await Review.create({
        user: userId,
        product: productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
    });

    await updateProductRating(productId);

    return await Review.findById(review._id)
        .populate("user", "name")
        .populate("product", "name");
};

const getProductReviews = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return await Review.find({ product: productId })
        .populate("user", "name")
        .sort({ createdAt: -1 });
};

const updateReview = async (reviewId, userId, reviewData) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.user.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You can only update your own review."
        );
    }

    review.rating = reviewData.rating;
    review.comment = reviewData.comment;

    await review.save();

    await updateProductRating(review.product);

    return await Review.findById(review._id)
        .populate("user", "name")
        .populate("product", "name");
};

const deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ApiError(404, "Review not found");
    }

    if (review.user.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You can only delete your own review."
        );
    }

    const productId = review.product;

    await Review.findByIdAndDelete(reviewId);

    await updateProductRating(productId);

    return null;
};

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
};