const express = require("express");

const cartController = require("../controllers/cartController");

const routes = express.Router();


routes.post("/items/:id", cartController.insertCartItems);
routes.get("/items/user/:id", cartController.getCartItems);


module.exports = routes;