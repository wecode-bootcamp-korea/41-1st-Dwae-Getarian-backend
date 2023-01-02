const express = require("express");

const { createOrdersRequest } = require("../controllers/orderController");
const { jwtVerify } = require("../middlewares/auth");

const routes = express.Router();

routes.post("/items", jwtVerify, createOrdersRequest);

module.exports = routes;