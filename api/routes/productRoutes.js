const express = require("express");

const productControllers = require("../controllers/productControllers");

const routes = express.Router();

routes.get("", productControllers.getAllProducts);
routes.get("/detail/:productId", productControllers.getSpecificProduct);
routes.get("/category", productControllers.getCategorisedProducts);
routes.get("/query", productControllers.searchedProducts);


module.exports = routes;