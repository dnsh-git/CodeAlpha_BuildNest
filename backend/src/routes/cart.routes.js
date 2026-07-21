const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    addToCart,
    getCart,
} = require("../controllers/cart.controller");

const {
    addToCartValidator,
} = require("../validators/cart.validator");

// =====================
// User Cart Routes
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

module.exports = router;