const productService = require("../services/productService");

async function getAllProducts(req, res) {
    const allProducts = await productService.getAllProducts();

    return res.status(201).json({ data: allProducts });
}

async function getCategorisedProducts(req, res) {
    const { categoriesId } = req.query;

    const categorisedProducts = await productService.getCategorisedProducts(categoriesId);

    return res.status(201).json({ data: categorisedProducts });
}

module.exports = {
    getAllProducts,
    getCategorisedProducts
} 