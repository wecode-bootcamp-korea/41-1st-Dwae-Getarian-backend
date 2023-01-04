const productModel = require("../models/productDao");


async function getAllProducts() {
    const allProducts = await productModel.getAllProducts();

    return allProducts;
}

async function getSpecificProduct(productId) {
    const product = await productModel.getSpecificProduct(productId);

    return product;
}

async function getCategorisedProducts(categoryId, displayColumn, displayOption) {
    const categorisedProducts = await productModel.getCategorisedProducts(categoryId, displayColumn, displayOption);

    return categorisedProducts;
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct
}