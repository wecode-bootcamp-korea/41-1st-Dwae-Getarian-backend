const express = require("express");

const userRoutes = require("./userRoutes");
// const cartRoutes = require();
// const orderRoutes = require();
const productRoutes = require("./productRoutes");

const routes = express.Router();

routes.use("/user", userRoutes);

module.exports = routes;