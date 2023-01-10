const productService = require("../services/productService");

async function getProductsById(req, res, next) {
    try {
        const { productId } = req.params;
        const product = await productService.getProductsById(productId);
    
        if (!product.length) {
            const err = new Error("failed to fetch a data");
            err.statusCode = 404;
            throw err;
        }
    
        return res.status(200).json(product);
        
    } catch(err) {
        next(err);
    } 
}


async function getProductsByCategory(req, res, next) {
	try {
		const queryParams = req.query || "";
		const categorisedProducts = await productService.getProductsByCategory(queryParams);

		if (!categorisedProducts.length) {
				const err = new Error ("No follwing products");
				err.statusCode = 404;
				throw err;
		}

		return res.status(200).json(categorisedProducts);

} catch(err) {
		next(err);
}
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
    getProductsByCategory,
    searchedProducts,
		getBestSellingProducts
} 