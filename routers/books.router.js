const express = require("express");
const booksController = require("../controllers/books.controller");
const booksRouter = express.Router();

function validateRequest(req, res, next) {
	next();
}

booksRouter.use(validateRequest);

booksRouter.get("/", booksController.getAllBooks);
booksRouter.get("/:id", booksController.getSingleBook);
booksRouter.put("/:id", booksController.putBook);
booksRouter.patch("/:id", booksController.patchBook);
booksRouter.post("/", booksController.postBook);
booksRouter.delete("/:id", booksController.deleteBook);

module.exports = booksRouter;
