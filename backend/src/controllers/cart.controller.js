const asyncHandler = require("express-async-handler");

const cartService = require("../services/cart.service");
const ApiResponse = require("../utils/ApiResponse");

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const cart = await cartService.addToCart(
        req.user._id,
        productId,
        quantity
    );

    return res.status(200).json(
        new ApiResponse(200, cart, "Product added to cart successfully.")
    );
});

const getCart = asyncHandler(async (req, res) => {
    const cart = await cartService.getCart(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully.")
    );
});

module.exports = {
    addToCart,
    getCart,
};