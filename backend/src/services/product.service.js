const Product = require("../models/product.model");

const ApiError = require("../utils/ApiError");

// Create Product
const createProduct = async (productData) => {
  const existingProduct = await Product.findOne({
    name: productData.name,
    brand: productData.brand,
  });

  if (existingProduct) {
    throw new ApiError(
      409,
      "Product already exists with the same name and brand."
    );
  }

  return await Product.create(productData);
};

// Get All Products
const getAllProducts = async () => {
  return await Product.find();
};

// Get Product By ID
const getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};