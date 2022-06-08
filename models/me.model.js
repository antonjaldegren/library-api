const db = require("../database");

function getLoans(userId) {
	const sql = `
    SELECT book_id
    FROM loans
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
		db.all(sql, userId, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

module.exports = {
	getLoans,
	getUser,
};
