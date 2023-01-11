const { detectError } = require("../util/detectError");
const productService = require("../services/productService");

async function getProductsById(req, res, next) {
	const { productId } = req.params;
	const product = await productService.getProductsById(productId);

	if (!product.length) {
		detectError("NO FOLLOWING PRODUCT", 401);
	}

	return res.status(200).json(product);
} 

async function getProducts(req, res, next) {
	const queryParams = req.query;
	const categorisedProducts = await productService.getProducts(queryParams);

<<<<<<< HEAD
	if (!categorisedProducts.length) {
		detectError("NO FOLLOWING PRODUCTS", 401);
	}
=======
async function getProductsByCategory(req, res, next) {
	try {
		const queryParams = req.query || "";
		const categorisedProducts = await productService.getProductsByCategory(queryParams);
>>>>>>> 0ca1a3246dcf9264e7d1b7f4f4b97f0042b731bf

	return res.status(200).json(categorisedProducts);
}

async function searchedProducts(req, res) {
	const { keyWord } = req.body

	const searchedProducts = await productService.searchedProducts(keyWord);

	return res.status(201).json(searchedProducts);
}

async function getBestSellingProducts(req, res) {
	const queryParams = req.query;

	const bestProductsList = await productService.getBestSellingProducts(queryParams);

	return res.status(200).json(bestProductsList);
}

module.exports = {
    getProductsById,
    getProducts,
    searchedProducts,
		getBestSellingProducts
} 