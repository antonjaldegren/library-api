const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
	// Try/catch?
	if (err) {
		console.error(err.message);
		throw err;
	}

	console.log("Connected to database");

	const statements = {
		books: `
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT,
      publishedAt TEXT,
      qty INTEGER
    )`,
		users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT,
    )`,
	};

	db.run(statements.books, (err) => {
		if (err) console.error(err.message);
	});

	db.run(statements.users, (err) => {
		if (err) console.error(err.message);
	});
});

module.exports = db;
