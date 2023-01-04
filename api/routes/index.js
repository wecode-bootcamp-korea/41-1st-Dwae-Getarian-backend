const express = require("express");


const orderRoutes = require("./orderRoutes");



const routes = express.Router();


routes.use("/order", orderRoutes);


module.exports = routes;