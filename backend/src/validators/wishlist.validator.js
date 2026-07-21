const { body, param } = require("express-validator");

const addToWishlistValidator = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .isMongoId()
        .withMessage("Invalid Product ID"),
];

const removeFromWishlistValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid Product ID"),
];

module.exports = {
    addToWishlistValidator,
    removeFromWishlistValidator,
};