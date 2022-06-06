function registerUser(req, res) {
	res.status(200).json({ success: "New user registered" });
}

function loginUser(req, res) {
	res.status(200).json({ success: "User logged in" });
}

module.exports = {
	registerUser,
	loginUser,
};
