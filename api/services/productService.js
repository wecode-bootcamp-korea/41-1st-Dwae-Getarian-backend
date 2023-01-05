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

async function getCategorisedProducts(categoryId, displayColumn, displayOption) {
    const categorisedProducts = await productModel.getCategorisedProducts(categoryId, displayColumn, displayOption);

    return categorisedProducts;
}

async function searchedProducts(keyWord) {
    const searchedProducts = await productModel.searchProducts(keyWord);

    return searchedProducts;
}

async function getBestSellingProducts() {
	const values = [];
	const productsList = await productModel.getBestSellingProducts();

	const sortedProductsList = await mergeSort(productsList);

	const productData = sortedProductsList.slice(-10);
	console.log(productData)
	for (const product of productData) {
		const array = [];
		array.push(product["product_id"])
		values.push(array);
	}

	console.log(values);

	// const a = await getProductsById(bestSellingProducts);

	// console.log(a)

	// return productsPurchaseStats;
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getProductsById,
    searchedProducts,
		getBestSellingProducts
}