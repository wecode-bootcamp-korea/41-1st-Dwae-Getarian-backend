const express = require("express");

const cartRoutes = require("./cartRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");

const routes = express.Router();

routes.use("/cart", cartRoutes);
routes.use("/product", productRoutes);
routes.use("/user", userRoutes);
routes.use("/order", orderRoutes);

module.exports = routes;
