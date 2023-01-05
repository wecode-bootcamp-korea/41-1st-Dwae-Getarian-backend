const asyncErrorHandler = (func) => {
	return async (req, res, next) => {
		await func(req, res).catch((error) => next(error));
	};
};


const signUp = asyncErrorHandler(async (request, response) => {
	const { name, email, password, phoneNumber } = request.body;
	if (!name || !email || !password || !phoneNumber) {
		let errorMessage = "";
		errorMessage += !name ? "name must be provided! " : "";
		errorMessage += !email ? " email must be provided! " : "";
		errorMessage += !password ? " password must be provided! " : "";
		errorMessage += !phoneNumber ? " phoneNumber must be provided!2 " : "";
		const err = new Error(errorMessage);
		err.statusCode = 400;
		throw err;
	}
});