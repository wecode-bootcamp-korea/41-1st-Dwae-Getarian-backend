require("dotenv").config();

const jwt = require("jsonwebtoken");

const { detectError } = require("../util/detectError");

async function jwtVerify (req, res, next) {
	try {
		const token = req.headers.authorization;

		if (!token) {
			detectError("TOKEN DOES NOT EXIST", 401);
		}

		const decoded = await jwt.verify(token, process.env.SECRET_KEY);

		if (!decoded) {
			detectError("DECODING FAILED", 401);
		}

		req.userId = decoded.userId;
		next();
		
} catch(err) {
	next(err);
}
}

module.exports = {
  jwtVerify
}