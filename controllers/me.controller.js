function getMe(req, res) {
	res.status(200).json({ data: "This is my protected data" });
}

module.exports = {
	getMe,
};
