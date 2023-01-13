const { checkSpecial } = require("../util/checkSpecial");
const { detectError } = require("../util/detectError");
const productModel = require("../models/productDao");

async function getProductsById(productId) {
  const product = await productModel.getProductsById(productId);

  return product;
}

async function getProducts(queryParams) {
  const categorisedProducts = await productModel.getProducts(queryParams);

  return categorisedProducts;
}

async function searchProducts(keyWord) {
	if(checkSpecial(keyWord)) detectError("NOT VALID INPUT", 401);

  const searchedProducts = await productModel.searchProducts(keyWord);

  return searchedProducts;
}

async function getBestSellingProducts(queryParams) {
	const bestProductsList = await productModel.getBestSellingProducts(queryParams);

	return bestProductsList;
}

module.exports = {
	getProductsById,
  getProducts,
  searchProducts,
	getBestSellingProducts
}