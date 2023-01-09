const productModel = require("../models/productDao");

async function getAllProducts() {
    const allProducts = await productModel.getAllProducts();

    return allProducts;
}

async function getProductsById(productId) {
    const product = await productModel.getProductsById(productId);

    return product;
}

async function getProductsByCategory(categoryId, displayColumn, displayOption) {
    const categorisedProducts = await productModel.getProductsByCategory(categoryId, displayColumn, displayOption);

    return categorisedProducts;
}

async function searchedProducts(keyWord) {
    const searchedProducts = await productModel.searchProducts(keyWord);

    return searchedProducts;
}

async function getBestSellingProducts(categoryId) {
	const bestProductsList = await productModel.getBestSellingProducts(categoryId);

	return bestProductsList;
}

module.exports = {
    getAllProducts,
		getProductsById,
    getProductsByCategory,
    searchedProducts,
		getBestSellingProducts
}