const express = require("express");

const userController = require("../controllers/userController");

const routes = express.Router();

routes.post("/signUp", userController.signUp);
routes.post("/logIn", userController.logIn);

module.exports = routes;