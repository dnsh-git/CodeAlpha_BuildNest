const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
    addToCart,
    getCart,
} = require("../controllers/cart.controller");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;