require('dotenv').config();

const jwt = require("jsonwebtoken");

const passwordHandler = require("../util/bcrypt");
const userDatabase = require("../models/userDao");


async function signUp(user) {

    // eg test@email.com
    const emailValidation = new RegExp(
        "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
    ); 

    // Minimum eight characters, at least one letter and one number:
    const passwordValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    );

    if (!emailValidation.test(user.email) || !passwordValidation.test(user.password)) {
        const err = new Error({ message: "INVALID INPUT DATA (USER SERVICE) PASSWORD EMAIL"});
        err.statusCode = 401; 
        throw err;
    }

    const hashedPassword = await passwordHandler.encode(user.password);

    const result = await userDatabase.signUp(user, hashedPassword);


    return result;
}

async function logIn(enteredEmail, enteredPassword) {
    const userData = await userDatabase.logIn(enteredEmail);

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
    signUp,
    logIn
}