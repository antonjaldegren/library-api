const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
	if (err) {
		console.error(err.message);
		throw err;
	}

	console.log("Connected to database");

	const statements = {
		books: `
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT,
      qty INTEGER
    );`,
		users: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );`,
		loans: `
    CREATE TABLE IF NOT EXISTS loans (
      user_id INTEGER,
      book_id INTEGER,
			FOREIGN KEY(user_id) REFERENCES users(id),
			FOREIGN KEY(book_id) REFERENCES books(id)
			ON DELETE CASCADE
    );`,
	};

	db.exec("PRAGMA foreign_keys = ON;", (err) => {
		if (err) console.error(err.message);
	});

	db.run(statements.books, (err) => {
		if (err) console.error(err.message);
	});

	db.run(statements.users, (err) => {
		if (err) console.error(err.message);
	});

	db.run(statements.loans, (err) => {
		if (err) console.error(err.message);
	});
});

module.exports = db;
