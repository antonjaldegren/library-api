function authorizeUser(req, res, next) {
	console.log("Authorizing user...");
	next();
}

module.exports = {
	authorizeUser,
};
