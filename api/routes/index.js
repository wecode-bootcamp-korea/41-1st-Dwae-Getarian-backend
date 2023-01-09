const express = require("express");

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;
