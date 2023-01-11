const express = require("express");

const { userSignUp, userLogIn } = require("../controllers/userController");
const { asyncErrorHandler } = require("../middlewares/errorHandler");

const routes = express.Router();

routes.post("/signup", asyncErrorHandler(userSignUp));
routes.post("/login", userLogIn);

module.exports = routes;