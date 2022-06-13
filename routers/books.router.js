const express = require("express");
const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

const validateData = require("../middlewares/books");

booksRouter.get("/", booksController.getAllBooks);
booksRouter.get("/:id", booksController.getSingleBook);
booksRouter.put("/:id", validateData, booksController.editBook);
booksRouter.patch("/:id", validateData, booksController.editBook);
booksRouter.post("/", validateData, booksController.addBook);
booksRouter.delete("/:id", booksController.deleteBook);

module.exports = booksRouter;
