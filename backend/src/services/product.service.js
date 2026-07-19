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

// Get All Products (Search + Category + Brand)
const getAllProducts = async (query) => {
    const { search, category, brand } = query;

    const filter = {};

    // Search
    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                brand: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                description: {
                    $regex: search,
                    $options: "i",
                },
            },
        ];
    }

    // Category Filter
    if (category) {
        filter.category = category;
    }

    // Brand Filter
    if (brand) {
        filter.brand = {
            $regex: `^${brand}$`,
            $options: "i",
        };
    }

    return await Product.find(filter);
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

// Delete Product
const deleteProduct = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    await product.deleteOne();

    return;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};