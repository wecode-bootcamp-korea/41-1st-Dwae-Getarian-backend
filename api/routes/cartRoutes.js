const express = require("express");

const cartController = require("../controllers/cartController");

const routes = express.Router();


routes.post("/items/:id", cartController.postCartItems);


module.exports = router;