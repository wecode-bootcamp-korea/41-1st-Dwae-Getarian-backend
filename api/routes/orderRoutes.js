const express = require("express");

const { asyncErrorHandler } = require("../middlewares/errorHandler");
const { createOrdersRequest, deleteOrdersRequest } = require("../controllers/orderController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();
// , jwtVerify

routes.post("/items/:id", asyncErrorHandler(createOrdersRequest));
routes.delete("/", asyncErrorHandler(deleteOrdersRequest));

module.exports = routes;