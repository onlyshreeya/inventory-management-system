const { body } = require("express-validator");

exports.productValidation = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),
];