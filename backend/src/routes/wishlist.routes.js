const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} = require("../controllers/wishlist.controller");

const {
    addToWishlistValidator,
    removeFromWishlistValidator,
} = require("../validators/wishlist.validator");

router.use(protect);

router.post(
    "/",
    validate(addToWishlistValidator),
    addToWishlist
);

router.get(
    "/",
    getWishlist
);

router.delete(
    "/:productId",
    validate(removeFromWishlistValidator),
    removeFromWishlist
);

module.exports = router;