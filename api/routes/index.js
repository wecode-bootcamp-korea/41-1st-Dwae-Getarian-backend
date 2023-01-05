const express = require("express");

const cartRoutes = require("./cartRoutes");

const routes = express.Router();

routes.use("/cart", cartRoutes);

module.exports = routes;