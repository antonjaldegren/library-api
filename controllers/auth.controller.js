const jwt = require("jsonwebtoken");
const md5 = require("md5");
const model = require("../models/auth.model");

async function registerUser(req, res) {
	const { name, email, password } = req.body;
	try {
		if (!name || !email || !password) throw new Error("Data missing");

		const existingUser = await model.getSingle(email);
		if (existingUser) throw new Error("Email is already in use");

		const newUser = {
			name,
			email,
			password: md5(password),
		};

		await model.add(newUser);
		const result = await model.getSingle(email, false);

		res.status(200).json({ status: "success", data: result });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

async function loginUser(req, res) {
	const { email, password } = req.body;

	try {
		if (!email || !password) throw new Error("Data missing");

		const existingUser = await model.getSingle(email, true);
		if (!existingUser) throw new Error(`No user found with email ${email}`);

		const hashedPassword = md5(password);
		if (hashedPassword !== existingUser.password)
			throw new Error("Wrong password");

		const token = jwt.sign(
			{
				id: existingUser.id,
				name: existingUser.name,
				email: existingUser.email,
			},
			process.env.SECRET_KEY
		);

		res.status(200).json({ status: "success", token });
	} catch (err) {
		res.status(400).json({ status: "error", message: err.message });
	}
}

module.exports = {
	registerUser,
	loginUser,
};
