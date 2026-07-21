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
            quantity,
        });
    }

    await cart.save();

    return cart.populate("items.product");
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    return (
        cart || {
            user: userId,
            items: [],
        }
    );
};

module.exports = {
    addToCart,
    getCart,
};