function auth(req, res, next) {
	console.log("Authorizing user...");
	next();
}

module.exports = auth;
