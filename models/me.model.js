const db = require("../database");

function getLoans(userId) {
	const sql = `
    SELECT id, title, author, genre, qty
    FROM loans
		INNER JOIN books ON id = book_id
    WHERE user_id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.all(sql, userId, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

function getUser(userId) {
	const sql = `
    SELECT id, name, email
    FROM users
    WHERE id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.get(sql, userId, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports = {
	getLoans,
	getUser,
};
