const Wishlist = require("../models/wishlist.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const addToWishlist = async (userId, productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: userId,
            products: [],
        });
    }

    const exists = wishlist.products.some(
        (id) => id.toString() === productId
    );

    if (exists) {
        throw new ApiError(400, "Product already exists in wishlist");
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return await Wishlist.findOne({ user: userId }).populate("products");
};

const getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({ user: userId }).populate("products");

    if (!wishlist) {
        return {
            user: userId,
            products: [],
        };
    }

    return wishlist;
};

const removeFromWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
    );

    await wishlist.save();

    return await Wishlist.findOne({ user: userId }).populate("products");
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};