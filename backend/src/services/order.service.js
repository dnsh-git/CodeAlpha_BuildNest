const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const ApiError = require("../utils/ApiError");

const placeOrder = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
        throw new ApiError(400, "Cart is empty");
    }

    const orderItems = cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
    }));

    const totalAmount = orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
    });

    cart.items = [];
    await cart.save();

    return await Order.findById(order._id)
        .populate("user", "name email")
        .populate("items.product");
};

const getMyOrders = async (userId) => {
    return await Order.find({ user: userId })
        .populate("items.product")
        .sort({ createdAt: -1 });
};

const getOrderById = async (orderId, userId) => {
    const order = await Order.findById(orderId)
        .populate("user", "name email")
        .populate("items.product");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.user._id.toString() !== userId.toString()) {
        throw new ApiError(403, "Access denied");
    }

    return order;
};

const updateOrderStatus = async (orderId, status) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    order.status = status;

    await order.save();

    return await Order.findById(order._id)
        .populate("user", "name email")
        .populate("items.product");
};

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
};