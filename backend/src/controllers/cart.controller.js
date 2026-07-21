const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const addToCart = async (userId, productId, quantity = 1) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
        });
    }

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += Number(quantity);
    } else {
        cart.items.push({
            product: productId,
            quantity: Number(quantity),
        });
    }

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
        return {
            user: userId,
            items: [],
        };
    }

    return cart;
};

const updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!item) {
        throw new ApiError(404, "Product not found in cart");
    }

    item.quantity = Number(quantity);

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const removeCartItem = async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    return await Cart.findOne({ user: userId }).populate("items.product");
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = [];

    await cart.save();

    return cart;
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};