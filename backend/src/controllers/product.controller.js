const asyncHandler = require("express-async-handler");

const productService = require("../services/product.service");

const ApiResponse = require("../utils/ApiResponse");

// @desc    Create Product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      product,
      "Product created successfully"
    )
  );
});

// @desc    Get All Products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();

  return res.status(200).json(
    new ApiResponse(
      200,
      products,
      "Products fetched successfully"
    )
  );
});

module.exports = {
  createProduct,
  getAllProducts,
};