const db = require("../database");

function getSingle(userId, bookId) {
	const sql = `
    SELECT *
    FROM loans
    WHERE user_id = ? AND book_id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.get(sql, [userId, bookId], (err, rows) => {
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

async function remove(userId, bookId) {
	const deleteSql = `
    DELETE FROM loans
    WHERE user_id = ? AND book_id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.run(deleteSql, [userId, bookId], (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

module.exports = {
	getSingle,
	add,
	remove,
};
