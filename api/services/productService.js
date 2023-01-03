const Product = require("../models/productDao");


async function getAllProducts() {
    const productModelHandler = new Product();

    const allProducts = await productModelHandler.getAllProducts();

    return allProducts;
}

async function getCategorisedProducts(categorisedId) {
    const productModelHandler = new Product();

    const categorisedProducts = await productModelHandler.getCategorisedProducts();

    return categorisedProducts;
}

module.exports = {
    getAllProducts: getAllProducts,
    getCategorisedProducts: getCategorisedProducts
}