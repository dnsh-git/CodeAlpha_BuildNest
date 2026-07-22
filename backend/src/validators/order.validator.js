const { body, param } = require("express-validator");

const placeOrderValidator = [];

const getOrderValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid Order ID"),
];

const updateOrderStatusValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid Order ID"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn([
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ])
        .withMessage("Invalid order status"),
];

module.exports = {
    placeOrderValidator,
    getOrderValidator,
    updateOrderStatusValidator,
};