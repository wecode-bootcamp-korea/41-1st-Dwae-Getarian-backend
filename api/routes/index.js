const express = require("express");

const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");

const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/product", productRoutes);

module.exports = routes;