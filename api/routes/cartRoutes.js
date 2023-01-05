const express = require("express");

const cartController = require("../controllers/cartController");

const routes = express.Router();


routes.post("/items/:id", cartController.insertCartItems);
routes.get("/items", cartController.getCartItems);


module.exports = router;