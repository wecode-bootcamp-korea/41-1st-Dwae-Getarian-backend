const express = require("express");

const { userSignUp, userLogIn } = require("../controllers/userController");

const routes = express.Router();

routes.post("/signup", userSignUp);
routes.post("/login", userLogIn);

module.exports = routes;