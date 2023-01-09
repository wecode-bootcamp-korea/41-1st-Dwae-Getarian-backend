const express = require("express");

const cartController = require("../controllers/cartController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();


routes.post("/items", jwtVerify, cartController.insertCartItems);
routes.get("/items/user", jwtVerify, cartController.getCartItems);
routes.delete("/items", jwtVerify, cartController.deleteCartItems)

module.exports = routes;