const express = require("express");

const { getAllProducts, getCategorisedProducts } = require("../controllers/productControllers");

const routes = express.Router();

routes.get("", getAllProducts);
routes.get("/categories", getCategorisedProducts);


module.exports = routes;