function validateData(req, res, next) {
	const { body: data, method } = req;

	if (typeof data !== "object" || data === null || Array.isArray(data))
		return res
			.status(400)
			.json({ status: "error", message: "Invalid json" });

	if (["POST", "PUT"].includes(method)) {
		if (
			typeof data.title === "string" &&
			data.title.length > 0 &&
			typeof data.author === "string" &&
			data.author.length > 0 &&
			typeof data.genre === "string" &&
			data.genre.length > 0 &&
			typeof data.qty === "number" &&
			data.qty >= 0
		) {
			return next();
		}
	} else if (method === "PATCH") {
		if (
			(typeof data.title === "string" && data.title.length > 0) ||
			(typeof data.author === "string" && data.author.length > 0) ||
			(typeof data.genre === "string" && data.genre.length > 0) ||
			(typeof data.qty === "number" && data.qty >= 0)
		) {
			console.log("validating...");
			return next();
		}
	}

	res.status(400).json({ status: "error", message: "Invalid data" });
}

module.exports = validateData;
