
const app = require('express');
const { body, validationResult } = require("express-validator");
const { getAllBooks, getBooksById, updateBooksById, createBooks, deleteBooks } = require('../controllers/books.controller')
const handleValidationError = require('../middlewares/handleValidationError')

const bookRouter = app.Router()

bookRouter.get('/', getAllBooks);
bookRouter.get("/:title", getBooksById)


bookRouter.put("/:title",
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("author").optional().trim().notEmpty().withMessage("Author cannot be empty"),
    body("isRead").optional().isBoolean().withMessage("isRead must be boolean").toBoolean(),
    body("year").optional().isInt({ min: 0, max: new Date().getFullYear() }).withMessage("Invalid year"),
    handleValidationError,
    updateBooksById
);


bookRouter.post("",
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("isRead").isBoolean().withMessage("isRead must be boolean").toBoolean(),
    body("year").isInt({ min: 0, max: new Date().getFullYear() }).withMessage("Year must be a valid integer").toInt(),
    handleValidationError,
    createBooks
);


bookRouter.delete("/:id", deleteBooks);

module.exports = bookRouter

