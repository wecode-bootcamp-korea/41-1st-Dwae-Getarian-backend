require('dotenv').config();

const jwt = require("jsonwebtoken");

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
        const err = new Error({ message: "INVALID INPUT DATA (USER SERVICE) EMAIL"});
        err.statusCode = 401; 
        throw err;
    }

		if (!passwordValidation.test(user.password)) {
			const err = new Error({ message: "INVALID INPUT DATA (USER SERVICE) PASSWORD"});
			err.statusCode = 401; 
			throw err;
		}

    const hashedPassword = await passwordHandler.encode(user.password);

    const requestResult = await userDatabase.signUp(user, hashedPassword);
		const userId = requestResult.insertId;

		const addressTable = await userDatabase.upsertUserAddress(userId, user);

		if (!addressTable) {
			throw new Error("No TABLE (USER SERVICE)");
		}

    return requestResult;
}

async function userLogIn(enteredEmail, enteredPassword) {
    const [ userData ] = await userDatabase.logIn(enteredEmail);

    const passwordsAreEqual = await passwordHandler.decode(enteredPassword, userData.password);

    if (!passwordsAreEqual) {
        const err = new Error({ message: "INVALID PASSWORD!!!(USER SERVICE)" } );
        err.statusCode = 401;
        throw err;
    }

    const jwtToken = jwt.sign({userId: userData.id}, process.env.SECRET_KEY);

    return jwtToken;
}

 
module.exports = {
    userSignUp,
    userLogIn
}