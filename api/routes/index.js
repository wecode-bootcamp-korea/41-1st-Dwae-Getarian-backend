const express = require("express");

const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");

const routes = express.Router();

routes.use("/order", orderRoutes);
routes.use("/product", productRoutes);


module.exports = routes;
