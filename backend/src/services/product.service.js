const Product = require("../models/product.model");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getAllProducts = async () => {
  return await Product.find();
};

module.exports = {
  createProduct,
  getAllProducts,
};