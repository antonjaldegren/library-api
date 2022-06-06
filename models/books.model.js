const db = require("../database");

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

function getAll(cb) {
	const sql = `
  SELECT *
  FROM books;
  `;
	const params = [];

	db.all(sql, params, (err, rows) => {
		cb({ message: err ? "error" : "success", data: rows });
	});
}

function getSingle(id, cb) {
	const sql = `
  SELECT *
  FROM books
  WHERE id = ?;
  `;
	const params = [id];

	db.get(sql, params, (err, row) => {
		cb({ message: err ? "error" : "success", data: row });
	});
}

const VALID_KEYS = ["title", "author", "genre", "publishedAt", "qty"];

function edit(id, data, cb) {
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

	db.run(sql, params, (err, result) => {
		cb({ message: err ? "error" : "success", data: result });
	});
}

function add(data) {
	const sql = `
    INSERT INTO books (id, title, author, genre, publishedAt, qty)
    VALUES (?, ?, ?, ?, ?);
  `;
}

function remove(id) {
	const sql = `
    DELETE FROM recipes
    WHERE id = '${id}';
  `;
}

module.exports = {
	getAll,
	getSingle,
	edit,
	add,
	remove,
};
