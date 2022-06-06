function lendBook(req, res) {
	res.status(200).json({ success: "Book lended" });
}

function returnBook(req, res) {
	res.status(200).json({ success: "Book returned" });
}

module.exports = {
	lendBook,
	returnBook,
};
