const { signUp, logIn } = require("../services/userService");

async function userSignUp(req, res) {
    const user = req.body;

    if (!user.name || !user.email || !user.password) { 
        return json.status(401).json({ message: "KEY_ERROR INPUTS REQUIRED (USER CONTROLLER)" });
    }

    await signUp(user);

    return res.status(201).json({ message: "userCreated!!!" });
}   

async function userLogIn(req, res) {
    const { enteredEmail, enteredPassword } = req.body;

    if (!enteredEmail || !enteredPassword) {
        return json.status(401).json({ message: "KEY_ERROR INPUTS REQUIRED (USER CONTROLLER)" })
    }

    const jwtToken = await logIn(enteredEmail, enteredPassword);

    res.status(201).json({ jwtToken: jwtToken });
}

module.exports = {
    userSignUp,
    userLogIn
}