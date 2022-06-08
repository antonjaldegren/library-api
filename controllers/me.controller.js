const model = require("../models/me.model");

async function getMe(req, res) {
	const result = await model.get();
	res.status(200).json({ data: "This is my protected data" });
}

module.exports = {
	getMe,
};
