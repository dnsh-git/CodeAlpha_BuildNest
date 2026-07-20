const asyncHandler = require("express-async-handler");

const productService = require("../services/product.service");
const ApiResponse = require("../utils/ApiResponse");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    const product = await productService.createProduct(
    req.body,
    req.file
);

    return res.status(201).json(
        new ApiResponse(
            201,
            product,
            "Product created successfully."
        )
    );
});

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {
    const result = await productService.getAllProducts(req.query);

    const message =
        result.products.length > 0
            ? "Products fetched successfully."
            : "No products found.";

    return res.status(200).json(
        new ApiResponse(
            200,
            result,
            message
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
            "Product fetched successfully."
        )
    );
});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {
    const product = await productService.updateProduct(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            product,
            "Product updated successfully."
        )
    );
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Product deleted successfully."
        )
    );
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};