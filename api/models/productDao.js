const { appDataSource } = require("../database/database");

async function getAllProducts() {
    const allProducts = await appDataSource.query(
    `
    SELECT * FROM products;
    `);

    return allProducts;
}

async function getSpecificProduct(productId) {
    try {
        const product = await appDataSource.query(
            `
            SELECT * FROM products p
                INNER JOIN categories c 
                ON c.id = p.category_id
            WHERE p.id = ? 
            `, [ productId ]);
        
            return product;
            
    } catch(err) {
        throw err;
    }

}

async function getCategorisedProducts(categoriesId) {
    const categorisedProducts = await appDataSource.query(
    `
    SELECT * FROM products p 
        INNER JOIN categories c 
            ON p.categories_id = c.id
    WHERE c.id = ?
    `, [ categoriesId ]);

    return categorisedProducts;
}


module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct
}