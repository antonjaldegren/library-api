const db = require("../database");

const VALID_KEYS = ["title", "author", "genre", "publishedAt", "qty"];
/**
 * {
 *    id: string,
 *    title: string,
 *    author: string,
 *    genre: string,
 *    publishedAt: date,
 *    qty: number,
 * }
 */

function getAll() {
	const sql = `
    SELECT *
    FROM books;
  `;

	return new Promise((resolve, reject) => {
		db.all(sql, (err, rows) => {
			if (err) reject(err);
			resolve(rows);
		});
	});
}

function getSingle(id) {
	const sql = `
    SELECT *
    FROM books
    WHERE id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.get(sql, id, (err, row) => {
			if (err) reject(err);
			resolve(row);
		});
	});
}

function edit(id, data) {
	const sql = `
    UPDATE books SET
    title = COALESCE(?, title), 
    author = COALESCE(?, author), 
    genre = COALESCE(?, genre),
    publishedAt = COALESCE(?, publishedAt),
    qty = COALESCE(?, qty)
    WHERE id = ?;
  `;
	const params = [...VALID_KEYS.map((key) => data[key]), id];

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

function add(data) {
	const sql = `
    INSERT INTO books (title, author, genre, publishedAt, qty)
    VALUES (?, ?, ?, ?, ?);
  `;
	const params = [...VALID_KEYS.map((key) => data[key])];

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

function remove(id) {
	const sql = `
    DELETE FROM books
    WHERE id = ?;
  `;

	return new Promise((resolve, reject) => {
		db.run(sql, id, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}

module.exports = {
	getAll,
	getSingle,
	edit,
	add,
	remove,
};
