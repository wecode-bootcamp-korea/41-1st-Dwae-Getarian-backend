const productModel = require("../models/productDao");


async function getAllProducts() {
    const allProducts = await productModel.getAllProducts();

    return allProducts;
}

async function getSpecificProduct(productId) {
    const product = await productModel.getSpecificProduct(productId);

    return product;
}

async function getCategorisedProducts(categoryId) {
    const categorisedProducts = await productModel.getCategorisedProducts(categoryId);

    return categorisedProducts;
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct
}