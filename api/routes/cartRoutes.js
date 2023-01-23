const express = require("express");

const { asyncErrorHandler } = require("../middlewares/errorHandler");
const { jwtVerify } = require("../middlewares/auth");
const cartController = require("../controllers/cartController");

const routes = express.Router();

routes.post("/items", jwtVerify, asyncErrorHandler(cartController.insertCartItem));
routes.get("/items/user", jwtVerify, asyncErrorHandler(cartController.getCartItems));
routes.delete("/items", jwtVerify, asyncErrorHandler(cartController.deleteCartItems));
routes.patch("/items", jwtVerify, asyncErrorHandler(cartController.updateCartItems));

module.exports = routes;  