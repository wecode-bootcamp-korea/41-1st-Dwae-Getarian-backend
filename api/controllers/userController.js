const { detectError } = require("../util/detectError")
const userService = require("../services/userService");

async function userSignUp(req, res) {
  const user = req.body;

  if (!user.name || !user.email || !user.password) { 
    detectError("INVALID INPUT", 401);
  }

  await userService.userSignUp(user);

  return res.status(201).json({ message: "userCreated!!!" });
}   

async function userLogIn(req, res) {
  const { email, password } = req.body;
		
  if (!email || !password) {
    detectError("NO INPUT DATA", 401);
  }

  const jwtToken = await userService.userLogIn(email, password);

  return res.status(201).json({ jwtToken: jwtToken });
}

module.exports = {
  userSignUp,
  userLogIn
}