const model = require("../models/users.model");

async function getAllLoans(_, res) {
	try {
		const result = await model.getAll();

		res.status(200).json({ status: "success", data: result });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function lendBook(req, res) {
	// Get userId from token
	const userId = req.params.id;
	const bookId = req.body.bookId;

	try {
		await model.add(userId, bookId);
		res.status(200).json({ status: "success", data: { userId, bookId } });
	} catch (err) {
		res.status(400).json({ status: "error" });
	}
}

function returnBook(req, res) {
	res.status(200).json({ success: "Book returned" });
}

module.exports = {
	getAllLoans,
	lendBook,
	returnBook,
};
