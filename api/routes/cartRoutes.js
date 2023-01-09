const express = require("express");

const cartController = require("../controllers/cartController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();

// jwtVerify,
routes.post("/items/:id", cartController.insertCartItems);
routes.get("/items/user/:id", cartController.getCartItems);
routes.delete("/items", jwtVerify, cartController.deleteCartItems)

module.exports = routes;