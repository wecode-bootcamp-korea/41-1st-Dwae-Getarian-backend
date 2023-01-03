const express = require("express");

const { userSignUp, userLogIn } = require("../controllers/userController");

const routes = express.Router();

routes.post("/signUp", userSignUp);
routes.post("/logIn", userLogIn);

module.exports = routes;