const asyncHandler = require("express-async-handler");

const cartService = require("../services/cart.service");
const ApiResponse = require("../utils/ApiResponse");

// =====================
// Add Product to Cart
// =====================

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const cart = await cartService.addToCart(
        req.user._id,
        productId,
        quantity
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product added to cart successfully."
        )
    );
});

// =====================
// Get User Cart
// =====================

const getCart = asyncHandler(async (req, res) => {
    const cart = await cartService.getCart(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart fetched successfully."
        )
    );
});

// =====================
// Update Cart Item
// =====================

const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body;

    const cart = await cartService.updateCartItem(
        req.user._id,
        req.params.productId,
        quantity
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart updated successfully."
        )
    );
});

// =====================
// Remove Cart Item
// =====================

const removeCartItem = asyncHandler(async (req, res) => {
    const cart = await cartService.removeCartItem(
        req.user._id,
        req.params.productId
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Product removed from cart successfully."
        )
    );
});

// =====================
// Clear Cart
// =====================

const clearCart = asyncHandler(async (req, res) => {
    const cart = await cartService.clearCart(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            cart,
            "Cart cleared successfully."
        )
    );
});

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};