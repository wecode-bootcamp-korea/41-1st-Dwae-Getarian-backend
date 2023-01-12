const express = require("express");

const { asyncErrorHandler } = require("../middlewares/errorHandler");
const { createOrder, deleteOrder } = require("../controllers/orderController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();

routes.post("/items", jwtVerify, asyncErrorHandler(createOrder));
routes.delete("", jwtVerify, asyncErrorHandler(deleteOrder));

module.exports = routes;