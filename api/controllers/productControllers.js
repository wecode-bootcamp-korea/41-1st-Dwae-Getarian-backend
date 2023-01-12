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

	if (!categorisedProducts.length) {
		detectError("NO FOLLOWING PRODUCTS", 401);
	}

	return res.status(200).json(categorisedProducts);
}

async function searchProducts(req, res) {
	const { keyWord } = req.query

	const searchedProducts = await productService.searchProducts(keyWord);

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
    searchProducts,
		getBestSellingProducts
} 