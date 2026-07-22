const express = require("express");

const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/order.controller");

const {
    placeOrderValidator,
    getOrderValidator,
    updateOrderStatusValidator,
} = require("../validators/order.validator");

// =====================
// User Routes
// =====================

router.post(
    "/",
    protect,
    validate(placeOrderValidator),
    placeOrder
);

router.get(
    "/",
    protect,
    getMyOrders
);

router.get(
    "/:orderId",
    protect,
    validate(getOrderValidator),
    getOrderById
);

// =====================
// Admin Route
// =====================

router.patch(
    "/:orderId/status",
    protect,
    admin,
    validate(updateOrderStatusValidator),
    updateOrderStatus
);

module.exports = router;