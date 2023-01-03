const { getAllProducts, getCategorisedProducts } = require("../services/productService");

async function getAllProducts(req, res) {
    const allProducts = await getAllProducts();

    return res.status(201).json({ data: allProducts });
}

async function getCategorisedProducts(req, res) {
    const categoriesId = req.params;

    const categorisedProducts = await getCategorisedProducts(categoriesId);

    return res.status(201).json({ data: categorisedProducts });
}

module.exports = {
    getAllProducts: getAllProducts,
    getCategorisedProducts: getCategorisedProducts
} 