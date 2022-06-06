const { v4: uuidv4 } = require("uuid");
const model = require("../models/books.model");

function getAllBooks(_, res) {
	model.getAll((result) =>
		res.status(result.message === "error" ? 400 : 200).json(result)
	);
}

function getSingleBook(req, res) {
	const id = req.params.id;

	model.getSingle(id, (result) =>
		res.status(result.message === "error" ? 400 : 200).json(result)
	);
}

function putBook(req, res) {
	const result = model.edit(book);
}

function patchBook(req, res) {
	const id = req.params.id;
	const data = {
		title: null,
		author: null,
		genre: null,
		publishedAt: null,
		qty: 34,
	};

	model.edit(id, data, (result) =>
		res.status(result.message === "error" ? 400 : 200).json(result)
	);
}

function postBook(req, res) {
	const result = model.add(book);
}

function deleteBook(req, res) {
	const result = model.remove(id);
}

module.exports = {
	getAllBooks,
	getSingleBook,
	putBook,
	patchBook,
	postBook,
	deleteBook,
};
