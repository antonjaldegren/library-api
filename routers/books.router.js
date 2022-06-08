const express = require("express");
const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

function validateRequest(req, res, next) {
	next();
}

booksRouter.use(validateRequest);

booksRouter.get("/", booksController.getAllBooks);
booksRouter.get("/:id", booksController.getSingleBook);
booksRouter.put("/:id", booksController.editBook);
booksRouter.patch("/:id", booksController.editBook);
booksRouter.post("/", booksController.addBook);
booksRouter.delete("/:id", booksController.deleteBook);

module.exports = booksRouter;
