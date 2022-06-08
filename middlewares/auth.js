const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization)
			throw new Error("No authorization header provided");

		const token = req.headers.authorization.split(" ")[1];
		if (!token) throw new Error("No token found");

		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
	} catch (err) {
		return res.status(403).json({ status: "error", message: err.message });
	}

	next();
}

module.exports = verifyToken;
