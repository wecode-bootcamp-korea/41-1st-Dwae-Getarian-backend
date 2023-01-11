const express = require("express");

const { asyncErrorHandler } = require("../middlewares/errorHandler");
const { createOrdersRequest, deleteOrdersRequest } = require("../controllers/orderController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();

routes.post("/items/:id", jwtVerify, asyncErrorHandler(createOrdersRequest));
routes.delete("/", jwtVerify, asyncErrorHandler(deleteOrdersRequest));

module.exports = routes;