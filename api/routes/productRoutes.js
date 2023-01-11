const express = require("express");

const { asyncErrorHandler } = require("../middlewares/errorHandler");
const productControllers = require("../controllers/productControllers");

const routes = express.Router();

routes.get("/detail/:productId", asyncErrorHandler(productControllers.getProductsById));
routes.get("", asyncErrorHandler(productControllers.getProducts));
routes.get("/query", asyncErrorHandler(productControllers.searchedProducts));
routes.get("/best", asyncErrorHandler(productControllers.getBestSellingProducts));


module.exports = routes;