const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cart.controller");

const {
    addToCartValidator,
} = require("../validators/cart.validator");

// =====================
// Cart Routes
// =====================

// Add Product to Cart
router.post(
    "/",
    protect,
    validate(addToCartValidator),
    addToCart
);

// Get Logged-in User Cart
router.get(
    "/",
    protect,
    getCart
);

// Update Product Quantity
router.put(
    "/:productId",
    protect,
    validate(addToCartValidator),
    updateCartItem
);

// Remove Product from Cart
router.delete(
    "/:productId",
    protect,
    removeCartItem
);

// Clear Entire Cart
router.delete(
    "/",
    protect,
    clearCart
);

module.exports = router;