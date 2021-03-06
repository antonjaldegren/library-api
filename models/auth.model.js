const db = require("../database");

function getSingle(email, includePassword) {
	const sql = `SELECT ${
		includePassword ? "*" : "id, name, email"
	} FROM users WHERE email = ?`;

	return new Promise((resolve, reject) => {
		db.get(sql, [email], (err, row) => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve(row);
		});
	});
}

function add(user) {
	const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
	const params = ["name", "email", "password"].map((key) => user[key]);

	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) {
				console.error(err);
				reject(err);
			}
			resolve();
		});
	});
}

module.exports = {
	getSingle,
	add,
};
