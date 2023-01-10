require('dotenv').config();

const jwt = require("jsonwebtoken");

const { detectError } = require("../util/detectError");
const passwordHandler = require("../util/bcrypt");
const userDatabase = require("../models/userDao");


async function userSignUp(user) {
  // eg test@email.com
  const emailValidation = new RegExp(
		'[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
  ); 

  // Minimum eight characters, at least one letter and one number:
  const passwordValidation = new RegExp(
    "^[0-9a-z]+$"
  );

  if (!emailValidation.test(user.email)) {
		detectError("INVALID EMAIL", 401);
	}

	if (!passwordValidation.test(user.password)) {
		detectError("INVALID PASSWORD", 401);
	}

  const hashedPassword = await passwordHandler.encode(user.password);

	await userDatabase.userSignUpProcess(user, hashedPassword);
}

async function userLogIn(email, password) {
	const [ userData ] = await userDatabase.logIn(email);

	const passwordsAreEqual = await passwordHandler.decode(password, userData.password);

	if (!passwordsAreEqual) {
		detectError("PASSWORDS ARE NOT EQUAL");
	}

	const jwtToken = jwt.sign({userId: userData.id}, process.env.SECRET_KEY);

	return jwtToken;
}
 
module.exports = {
  userSignUp,
  userLogIn
}