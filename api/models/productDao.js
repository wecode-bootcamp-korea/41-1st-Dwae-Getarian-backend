const appDataSource = require("../database/database");

class Product {
    async getAllProducts() {
        const allProducts = await appDataSource.query(
        `
        SELECT * FROM products;
        `);

        return allProducts;
    }

    async getCategorisedProducts(categoriesId) {
        const categorisedProducts = await appDataSource.query(
        `
        SELECT * FROM products p 
        INNER JOIN categories c 
        ON p.categories_id = c.id
        WHERE c.id = ?
        `, [ categoriesId ]);

        return categorisedProducts;
    }
}

module.exports = Product;