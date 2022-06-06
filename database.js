const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (err) => {
	// Try/catch?
	if (err) {
		console.error(err.message);
		throw err;
	}

	console.log("Connected to database");

	const statement = `
    CREATE TABLE books (
      id TEXT PRIMARY KEY UNIQUE,
      title TEXT,
      author TEXT,
      genre TEXT,
      publishedAt DATE,
      qty INTEGER
    )`;

	db.run(statement, (err) => {
		if (err) return console.error(err.message);

		const insert =
			"INSERT INTO books (id, title, author, genre, publishedAt, qty) VALUES (?, ?, ?, ?, ?, ?)";

		db.run(insert, [
			"123abc",
			"Min bok",
			"Anton Jaldegren",
			"Horror",
			"2015-03-14",
			75,
		]);
		db.run(insert, [
			"456def",
			"Min andra bok",
			"Anton Jaldegren",
			"Fantacy",
			"1999-08-24",
			46,
		]);
	});
});

module.exports = db;
