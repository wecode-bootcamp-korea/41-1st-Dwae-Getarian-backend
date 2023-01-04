const productService = require("../services/productService");

async function getAllProducts(req, res, next) {
    const allProducts = await productService.getAllProducts();

    return res.status(201).json({ data: allProducts });
}

async function getSpecificProduct(req, res, next) {
    try {
        const { productId } = req.params;
        const product = await productService.getSpecificProduct(productId);
    
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


async function getCategorisedProducts(req, res, next) {
    try {
        let displayOption = "";
        let displayColumn = "";
        const categoryId  = req.query.id;

        displayColumn = req.query.display;
        displayOption = req.query.option;

        const categorisedProducts = await productService.getCategorisedProducts(categoryId, displayColumn, displayOption);
    
        if (!categorisedProducts.length) {
            const err = new Error ("No follwing products");
            err.statusCode = 404;
            throw err;
        }
    
        return res.status(201).json(categorisedProducts);

    } catch(err) {
        next(err);
    }
}

async function searchedProducts(req, res) {
    const { keyWord } = req.body

    const searchedProducts = await productService.searchedProducts(keyWord);

    return res.status(201).json(searchedProducts);
}

module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct,
    searchedProducts
} 