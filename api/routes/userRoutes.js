const express = require("express");

const { signUp, logIn } = require("../controllers/userController");

const routes = express.Router();

routes.post("/signUp", signUp);
routes.post("/logIn", logIn);

module.exports = routes;