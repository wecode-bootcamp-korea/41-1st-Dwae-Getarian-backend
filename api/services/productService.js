const productModel = require("../models/productDao");

async function getProductsById(productId) {
    const product = await productModel.getProductsById(productId);

    return product;
}

async function getProducts(queryParams) {
	const { sortBy, offset, limit, categoryId } = queryParams;
  const categorisedProducts = await productModel.getProducts(queryParams);

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
    getProducts,
    searchedProducts,
		getBestSellingProducts
}