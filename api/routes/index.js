const express = require("express");

const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoutes");

const routes = express.Router();

routes.use("/cart", cartRoutes);
routes.use("/product", productRoutes);


module.exports = routes;