const { body } = require("express-validator");

const createProductValidator = [
  body("name").custom((value, { req }) => {
    console.log("REQ.BODY INSIDE VALIDATOR:");
    console.log(req.body);
    return true;
  }),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative"),
];

module.exports = {
  createProductValidator,
};