const productModel = require("../models/productDao");
const { mergeSort } = require("../util/sorting");

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
	const values = [];
	const productsList = await productModel.getBestSellingProducts(categoryId);

	const sortedProductsList = await mergeSort(productsList);
	const productData = sortedProductsList.slice(0, 11);

	for (const product of productData) {
		const array = [];
		array.push(product["product_id"])
		values.push(array);
	}

	const bestSellingLists = await getProductsById(values);

	return bestSellingLists;
}

module.exports = {
    getAllProducts,
		getProductsById,
    getProductsByCategory,
    searchedProducts,
		getBestSellingProducts
}