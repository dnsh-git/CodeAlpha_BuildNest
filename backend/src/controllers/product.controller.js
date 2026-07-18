const asyncHandler = require("express-async-handler");

const productService = require("../services/product.service");
const ApiResponse = require("../utils/ApiResponse");

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

module.exports = {
  createProduct,
};