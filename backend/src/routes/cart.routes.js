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
    updateCartValidator,
    removeCartItemValidator,
} = require("../validators/cart.validator");

// Get User Cart
router.get("/", protect, getCart);

// Add Product to Cart
router.post(
    "/",
    protect,
    validate(addToCartValidator),
    addToCart
);

// Update Product Quantity
router.put(
    "/:productId",
    protect,
    validate(updateCartValidator),
    updateCartItem
);

// Remove Product
router.delete(
    "/:productId",
    protect,
    validate(removeCartItemValidator),
    removeCartItem
);

// Clear Cart
router.delete(
    "/",
    protect,
    clearCart
);

module.exports = router;