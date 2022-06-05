const { v4: uuidv4 } = require("uuid");
const model = require("../models/books.model");

function getAllBooks() {
	return model.getAll();
}

function getSingleBook(id) {
	return model.getSingle(id);
}

function putBook(book) {
	return model.edit(book);
}

function patchBook(book) {
	return model.edit(book);
}

function postBook(book) {
	return model.add(book);
}

function deleteBook(id) {
	return model.remove(id);
}

module.exports = {
	getAllBooks,
	getSingleBook,
	putBook,
	patchBook,
	postBook,
	deleteBook,
};
