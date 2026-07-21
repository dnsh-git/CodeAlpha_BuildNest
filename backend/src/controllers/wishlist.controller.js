const asyncHandler = require("express-async-handler");

const wishlistService = require("../services/wishlist.service");
const ApiResponse = require("../utils/ApiResponse");

// =====================
// Add Product to Wishlist
// =====================

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const wishlist = await wishlistService.addToWishlist(
        req.user._id,
        productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Product added to wishlist successfully."
        )
    );
});

// =====================
// Get Wishlist
// =====================

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.getWishlist(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Wishlist fetched successfully."
        )
    );
});

// =====================
// Remove Product
// =====================

const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.removeFromWishlist(
        req.user._id,
        req.params.productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            wishlist,
            "Product removed from wishlist successfully."
        )
    );
});

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};