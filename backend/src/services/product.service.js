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

// Update Product
const updateProduct = async (id, productData) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Prevent duplicate name + brand
  const duplicate = await Product.findOne({
    _id: { $ne: id },
    name: productData.name,
    brand: productData.brand,
  });

  if (duplicate) {
    throw new ApiError(
      409,
      "Another product already exists with the same name and brand."
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedProduct;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};