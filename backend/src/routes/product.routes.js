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
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

// Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post(
  "/",
  protect,
  admin,
  createProductValidator,
  validate,
  createProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

module.exports = router;