const express = require("express");

const { createOrdersRequest, deleteOrdersRequest } = require("../controllers/orderController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();
// , jwtVerify

routes.post("/items/:id", createOrdersRequest);
routes.delete("/", deleteOrdersRequest);

module.exports = routes;