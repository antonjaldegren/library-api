const model = require("../models/me.model");

async function getMe(req, res) {
	const id = req.user.id;

	const loans = await model.getLoans(id);
	const user = await model.getUser(id);

	res.status(200).json({ status: "success", data: { loans, user } });
}

module.exports = {
	getMe,
};
