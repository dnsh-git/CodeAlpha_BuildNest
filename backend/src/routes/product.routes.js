const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
  createProductValidator,
} = require("../validators/product.validator");

const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");

// Public Routes
router.get("/", getAllProducts);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  createProductValidator,
  validate,
  createProduct
);

module.exports = router;