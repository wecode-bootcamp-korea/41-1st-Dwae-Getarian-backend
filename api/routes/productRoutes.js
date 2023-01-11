const express = require("express");

const productControllers = require("../controllers/productControllers");

const routes = express.Router();

routes.get("/detail/:productId", productControllers.getProductsById);
routes.get("", productControllers.getProductsByCategory);
routes.get("/query", productControllers.searchedProducts);
routes.get("/best", productControllers.getBestSellingProducts);


module.exports = routes;