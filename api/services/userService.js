require('dotenv').config();

const jwt = require("jsonwebtoken");

const passwordHandler = require("../util/bcrypt");
const userDatabase = require("../models/userDao");


async function userSignUp(user) {
		console.log(user)
    // eg test@email.com
    const emailValidation = new RegExp(
			'[a-z0-9]+@[a-z]+\.[a-z]{2,3}'
    ); 

    // Minimum eight characters, at least one letter and one number:
    // const passwordValidation = new RegExp(
    //   "/^[A-Za-z0-9]{4,10}$/"
    // );

			console.log(user.password)

			// console.log(passwordValidation.test(user.password))

    if (!emailValidation.test(user.email)) {
        const err = new Error({ message: "INVALID INPUT DATA (USER SERVICE) EMAIL"});
        err.statusCode = 401; 
        throw err;
    }

		// if (!passwordValidation.test(user.password)) {
		// 	const err = new Error({ message: "INVALID INPUT DATA (USER SERVICE) PASSWORD"});
		// 	err.statusCode = 401; 
		// 	throw err;
		// }

    const hashedPassword = await passwordHandler.encode(user.password);

    const result = await userDatabase.signUp(user, hashedPassword);

    return result;
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