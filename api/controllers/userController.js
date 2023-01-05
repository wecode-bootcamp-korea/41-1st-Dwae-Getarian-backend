const userService = require("../services/userService");

async function userSignUp(req, res) {
    const user = req.body;

    if (!user.name || !user.email || !user.password) { 
        return json.status(401).json({ message: "KEY_ERROR INPUTS REQUIRED (USER CONTROLLER)" });
    }

    await userService.userSignUp(user);

    return res.status(201).json({ message: "userCreated!!!" });
}   

async function userLogIn(req, res) {
    const { email, password } = req.body;
		
    if (!email || !password) {
        return res.status(401).json({ message: "KEY_ERROR INPUTS REQUIRED (USER CONTROLLER)" })
    }

    const jwtToken = await userService.userLogIn(email, password);

    return res.status(201).json({ jwtToken: jwtToken });
}

module.exports = {
    userSignUp,
    userLogIn
}