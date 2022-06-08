const db = require("../database");

function getAll() {
	const sql = `
    SELECT *
    FROM loans;
  `;

	return new Promise((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

function add(userId, bookId) {
	const sql = `
    INSERT INTO loans (user_id, book_id)
    VALUES (?, ?);
  `;

	return new Promise((resolve, reject) => {
		db.run(sql, [userId, bookId], (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

function remove(userId, bookId) {
	const sql = `
    DELETE FROM books
    WHERE user_id = ? AND book_id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.run(sql, [userId, bookId], (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

module.exports = {
	getAll,
	add,
	remove,
};
