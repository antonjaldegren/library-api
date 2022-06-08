const model = require("../models/users.model");
const { getSingle: getSingleBook } = require("../models/books.model");

async function getAllLoans(_, res) {
	try {
		const result = await model.getAll();

		res.status(200).json({ status: "success", data: result });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function lendBook(req, res) {
	const userId = req.user.id;
	const bookId = req.body.bookId;

	try {
		if (!bookId) throw new Error("Invalid book ID provided");

		const book = await getSingleBook(bookId);
		if (!book) throw new Error(`No book with ID ${bookId} was found`);

		if (book.qty === 0)
			throw new Error(`No copies of ${book.title} are available`);

		const existingLoan = await model.getSingle(userId, bookId);
		if (existingLoan)
			throw new Error(`You already have an active loan of ${book.title}`);

		await model.add(userId, bookId);
		res.status(200).json({ status: "success", data: { userId, bookId } });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function returnBook(req, res) {
	const userId = req.user.id;
	const bookId = req.body.bookId;

	try {
		if (!bookId) throw new Error("Invalid book ID provided");

		const existingLoan = await model.getSingle(userId, bookId);
		if (!existingLoan)
			throw new Error(`No loan of book with ID ${bookId} was found`);

		await model.remove(userId, bookId);
		res.status(200).json({ status: "success", data: { userId, bookId } });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

module.exports = {
	getAllLoans,
	lendBook,
	returnBook,
};
