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

async function searchedProducts(keyWord) {
    const searchedProducts = await productModel.searchProducts(keyWord);

    return searchedProducts;
}

async function getBestSellingProducts() {
	const bestSellingProducts = await productModel.getBestSellingProducts();

	return bestSellingProducts;
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct,
    searchedProducts,
		getBestSellingProducts
}