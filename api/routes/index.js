const express = require("express");

const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/order", orderRoutes);
routes.use("/product", productRoutes);
routes.use("/cart", cartRoutes);

module.exports = routes;