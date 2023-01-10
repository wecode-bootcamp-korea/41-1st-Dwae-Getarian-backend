const productModel = require("../models/productDao");

async function getAllProducts() {
    const allProducts = await productModel.getAllProducts();

    return allProducts;
}

async function getProductsById(productId) {
    const product = await productModel.getProductsById(productId);

    return product;
}

async function getProductsByCategory(queryParams) {
    const categorisedProducts = await productModel.getProductsByCategory(queryParams);

    return categorisedProducts;
}

async function searchedProducts(keyWord) {
    const searchedProducts = await productModel.searchProducts(keyWord);

    return searchedProducts;
}

async function getBestSellingProducts(queryParams) {
	const bestProductsList = await productModel.getBestSellingProducts(queryParams);

	return bestProductsList;
}

module.exports = {
		getProductsById,
    getProductsByCategory,
    searchedProducts,
		getBestSellingProducts
}