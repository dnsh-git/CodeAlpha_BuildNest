console.log({
    PUBLIC: process.env.IMAGEKIT_PUBLIC_KEY,
    PRIVATE: process.env.IMAGEKIT_PRIVATE_KEY,
    URL: process.env.IMAGEKIT_URL_ENDPOINT,
});
const Product = require("../models/product.model");
const imagekit = require("../config/imagekit");
const ApiError = require("../utils/ApiError");

// Create Product
const createProduct = async (productData, file) => {
    // Check duplicate product
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

    // Default image object
    let image = {
        url: "",
        fileId: "",
        name: "",
    };

    // Upload image to ImageKit
    if (file) {
        const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
            folder: "/BuildNest/products",
        });

        image = {
            url: uploadedImage.url,
            fileId: uploadedImage.fileId,
            name: uploadedImage.name,
        };
    }

    // Create product
    const product = await Product.create({
        ...productData,
        image,
    });

    return product;
};

// Get All Products with Filters, Sorting, and Pagination
const getAllProducts = async (query) => {
    const {
        search,
        category,
        brand,
        minPrice,
        maxPrice,
        sort,
        page = 1,
        limit = 10,
    } = query;

    const filter = {};

    // ==========================
    // Search Filter
    // ==========================
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    // ==========================
    // Category Filter
    // ==========================
    if (category) {
        filter.category = category;
    }

    // ==========================
    // Brand Filter
    // ==========================
    if (brand) {
        filter.brand = {
            $regex: `^${brand}$`,
            $options: "i",
        };
    }

    // ==========================
    // Price Filter
    // ==========================
    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        }

        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    // ==========================
    // Sorting
    // ==========================
    const sortOption = sort || "-createdAt";

    // ==========================
    // Pagination
    // ==========================
    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const skip = (currentPage - 1) * pageLimit;

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(pageLimit);

    return {
        products,
        pagination: {
            totalProducts,
            totalPages: Math.ceil(totalProducts / pageLimit),
            currentPage,
            pageLimit,
        },
    };
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