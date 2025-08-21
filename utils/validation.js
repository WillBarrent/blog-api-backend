const { body } = require("express-validator");

const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Email must be filled")
    .isLength({ min: 3, max: 12 })
    .withMessage("Username must be between 3 and 12 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email must be filled")
    .isEmail()
    .withMessage("The format must be example@test.com"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Email must be filled")
    .isLength({ min: 8 })
    .withMessage("Password`s length must be at least 8 characters")
    .isAlphanumeric()
    .withMessage("Password must contain numbers and letters"),
];

const validatePost = [
  body("title")
    .notEmpty()
    .withMessage("Post mush have title")
    .isLength({ min: 5 })
    .withMessage("Title`s length must be at least 5 characters"),
  body("content")
    .notEmpty()
    .withMessage("Content must be filled")
    .isLength({ min: 50 })
    .withMessage("Content`s length must be at least 50 characters"),
];

const validateCommentary = [
  body("content").trim().notEmpty().withMessage("Commentary cannot be empty"),
];

module.exports = { validateUser, validateCommentary, validatePost };
