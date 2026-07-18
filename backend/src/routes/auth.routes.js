const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/auth.controller");

const { protect, admin } = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");

router.post(
  "/register",
  registerValidator,
  validate,
  registerUser
);

router.post(
  "/login",
  loginValidator,
  validate,
  loginUser
);

router.get("/profile", protect, getProfile);

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin!",
  });
});

module.exports = router;