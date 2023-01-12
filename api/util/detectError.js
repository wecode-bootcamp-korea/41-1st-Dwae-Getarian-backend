function detectError(message, status) {
	const err = new Error(message);
	err.statusCode = status;

	throw err;
}

module.exports = {
	detectError
}