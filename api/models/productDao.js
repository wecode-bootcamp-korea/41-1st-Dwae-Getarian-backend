const appDataSource = require("../database/database");

class Product {
    async getAllProduct() {
        const allProduct = await appDataSource.query(
        `
        SELECT * FROM products
        `);

        return allProduct;
    }
}

module.exports = Product;