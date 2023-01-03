const productService = require("../services/productService");

async function getAllProducts(req, res, next) {
    const allProducts = await productService.getAllProducts();

    return res.status(201).json({ data: allProducts });
}

async function getSpecificProduct(req, res, next) {
    try {
        const { productId } = req.params;

        const product = await productService.getSpecificProduct(productId);
    
        if (!product) {
            const err = new Error("failed to fetch a data");
            err.statusCode = 404;
            throw err;
        }
    
        return res.status(200).json(product);
    } catch(err) {
        next(err);
    } 
}

async function getCategorisedProducts(req, res, next) {
    const { categoriesId } = req.query;

    const categorisedProducts = await productService.getCategorisedProducts(categoriesId);

    return res.status(201).json({ data: categorisedProducts });
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct
} 