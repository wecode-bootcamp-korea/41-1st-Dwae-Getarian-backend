const express = require("express");

const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
// const cartRoutes = require();

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/order", orderRoutes);
routes.use("/product", productRoutes);

module.exports = routes;