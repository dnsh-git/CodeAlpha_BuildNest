const asyncHandler = require("express-async-handler");

const productService = require("../services/product.service");
const ApiResponse = require("../utils/ApiResponse");

// Create Product
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

// Get All Products
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

// Get Product By ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product fetched successfully"
    )
  );
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};