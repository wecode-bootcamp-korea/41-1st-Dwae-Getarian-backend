require('dotenv').config();

const bcrypt = require("../util/bcrypt");
const userDatabase = require("../models/userDao");
const jwt = require("jsonwebtoken");

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

    const passwordHandler = new bcrypt(user.password, null);
    const hashedPassword = await passwordHandler.encode();

    const userDatabaseHandler = new userDatabase();
    const result = await userDatabaseHandler.signUp(user, hashedPassword);

    return result;
}

async function logIn(enteredEmail, enteredPassword) {
    const userDatabaseHandler = new userDatabase();
    const userData = await userDatabaseHandler.logIn(enteredEmail);

    const passwordsAreEqual = await new bcrypt(enteredPassword, userData.password);

    if (!passwordsAreEqual) {
        const err = new Error({ message: "INVALID PASSWORD!!!(USER SERVICE)" } );
        err.statusCode = 401;
        throw err;
    }

    const jwtToken = jwt.sign({ userId: userData.id }, process.env.SECRET_KEY);

    return jwtToken;
}

 
module.exports = {
    signUp: signUp,
    logIn: logIn
}