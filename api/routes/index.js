const express = require("express");

const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
// const cartRoutes = require();

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;