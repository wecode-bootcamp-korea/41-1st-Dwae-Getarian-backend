const productService = require("../services/productService");

async function getAllProducts(req, res, next) {
    const allProducts = await productService.getAllProducts();

    return res.status(200).json({ data: allProducts });
}

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
			console.log(req.query);
        let displayOption = "";
        let displayColumn = "";

        displayColumn = req.query.sortBy;
        displayOption = req.query.option;

        const categorisedProducts = await productService.getProductsByCategory(categoryId, displayColumn, displayOption);
    
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
	let categoryId = "";

	if (req.query.categoryId) {
		categoryId = req.query.categoryId;
	}

	const bestSellingLists = await productService.getBestSellingProducts(categoryId);

	return res.status(200).json(bestSellingLists);
}

module.exports = {
    getAllProducts,
    getProductsById,
    getProductsByCategory,
    searchedProducts,
		getBestSellingProducts
} 