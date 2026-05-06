const express = require('express');
const { body } = require("express-validator");

const {
  getAllBooks,
  getBooksById,
  updateBooksById,
  createBooks,
  deleteBooks
} = require('../controllers/books.controller');

const handleValidationError = require('../middlewares/handleValidationError');

const bookRouter = express.Router();

// GET all books
bookRouter.get('/', getAllBooks);

// GET single book by title
bookRouter.get("/:title", getBooksById);

// UPDATE book
bookRouter.put(
  "/:title",
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("author").optional().trim().notEmpty().withMessage("Author cannot be empty"),
  body("isRead").optional().isBoolean().withMessage("isRead must be boolean").toBoolean(),
  body("year")
    .optional()
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage("Invalid year")
    .toInt(),
  handleValidationError,
  updateBooksById
);

// CREATE book
bookRouter.post(
  "/", // ⚠️ FIXED (was "")
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("author").trim().notEmpty().withMessage("Author is required"),
  body("isRead").isBoolean().withMessage("isRead must be boolean").toBoolean(),
  body("year")
    .isInt({ min: 0, max: new Date().getFullYear() })
    .withMessage("Year must be a valid integer")
    .toInt(),
  handleValidationError,
  createBooks
);

// DELETE book
bookRouter.delete("/:id", deleteBooks);

module.exports = bookRouter;