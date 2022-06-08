const { v4: uuidv4 } = require("uuid");
const model = require("../models/books.model");

function isValidData(req) {
	const { body: data, method } = req;

	if (typeof data !== "object" || data === null || Array.isArray(data))
		return false;
	if (["POST", "PUT"].includes(method)) {
		return (
			typeof data.title === "string" &&
			data.title.length > 0 &&
			typeof data.author === "string" &&
			data.title.length > 0 &&
			typeof data.genre === "string" &&
			data.title.length > 0 &&
			typeof data.publishedAt === "string" &&
			data.title.length > 0 &&
			typeof data.qty === "number"
		);
	}
	return (
		(typeof data.title === "string" && data.title.length > 0) ||
		(typeof data.author === "string" && data.title.length > 0) ||
		(typeof data.genre === "string" && data.title.length > 0) ||
		(typeof data.publishedAt === "string" && data.title.length > 0) ||
		typeof data.qty === "number"
	);
}

async function getAllBooks(_, res) {
	try {
		const result = await model.getAll();

		res.status(200).json({ status: "success", data: result });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function getSingleBook(req, res) {
	const id = req.params.id;

	try {
		const result = await model.getSingle(id);
		if (!result) throw new Error(`No book with id ${id} was found`);

		res.status(200).json({ status: "success", data: result });
	} catch (err) {
		res.status(404).json({ status: "error", message: err.message });
	}
}

async function editBook(req, res) {
	try {
		if (!isValidData(req)) throw new Error("Invalid data");

		const id = req.params.id;
		const data = {
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre,
			publishedAt: req.body.publishedAt,
			qty: req.body.qty,
		};
		await model.edit(id, data);

		const editedBook = await model.getSingle(id);
		if (!editedBook) throw new Error(`No book with id ${id} was found`);

		res.status(200).json({ status: "success", data: editedBook });
	} catch (err) {
		res.status(404).json({ status: "error", message: err.message });
	}
}

async function addBook(req, res) {
	try {
		if (!isValidData(req)) throw new Error("Invalid data");
		const data = {
			id: uuidv4(),
			title: req.body.title,
			author: req.body.author,
			genre: req.body.genre,
			publishedAt: req.body.publishedAt,
			qty: req.body.qty,
		};
		await model.add(data);

		res.status(200).json({ status: "success", data });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function deleteBook(req, res) {
	const id = req.params.id;

	try {
		const deletedBook = await model.getSingle(id);
		if (!deletedBook) throw new Error(`No book with id ${id} was found`);

		await model.remove(id);

		res.status(200).json({ status: "success", data: deletedBook });
	} catch (err) {
		res.status(404).json({ status: "error", message: err.message });
	}
}

module.exports = {
	getAllBooks,
	getSingleBook,
	editBook,
	addBook,
	deleteBook,
};
