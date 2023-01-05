const express = require("express");

const productControllers = require("../controllers/productControllers");

const routes = express.Router();

routes.get("", productControllers.getAllProducts);
routes.get("/detail/:productId", productControllers.getProductsById);
routes.get("/category", productControllers.getProductsById);
routes.get("/query", productControllers.searchedProducts);
routes.get("/best", productControllers.getBestSellingProducts);


module.exports = routes;