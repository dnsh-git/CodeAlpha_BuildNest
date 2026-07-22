const asyncHandler = require("express-async-handler");

const orderService = require("../services/order.service");
const ApiResponse = require("../utils/ApiResponse");

// =====================
// Place Order
// =====================

const placeOrder = asyncHandler(async (req, res) => {
    const order = await orderService.placeOrder(req.user._id);

    return res.status(201).json(
        new ApiResponse(
            201,
            order,
            "Order placed successfully."
        )
    );
});

// =====================
// Get My Orders
// =====================

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getMyOrders(req.user._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            orders,
            "Orders fetched successfully."
        )
    );
});

// =====================
// Get Order By ID
// =====================

const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(
        req.params.orderId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order fetched successfully."
        )
    );
});

// =====================
// Update Order Status
// =====================

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(
        req.params.orderId,
        status
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order status updated successfully."
        )
    );
});

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};