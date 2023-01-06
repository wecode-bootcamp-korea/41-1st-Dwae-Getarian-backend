const { appDataSource } = require("../database/database");

async function getAllProducts() {
    const allProducts = await appDataSource.query(
    `
    	SELECT * FROM products;
    `);

    return allProducts;
}

async function getProductsById(productId) {
    try {
        const product = await appDataSource.query(
					`
						SELECT * FROM products p 
            WHERE p.id = ? 
          `, [ productId ]);
        
            return product;
            
    } catch(err) {
        throw err;
    }
}

async function getProductsByCategory(categoryId, displayColumn, displayOption) {
	let values = "";
	let conditions = "";
	let secondQuery = ""; 

	const firstQuery = `SELECT p.id AS id, p.name AS name, p.thumbnail_image AS image FROM products p `;

	if (displayColumn || displayOption) {
		secondQuery = `ORDER BY ${displayColumn} ${displayOption}`
	}

	if (categoryId) {
		values = `INNER JOIN categories c ON p.category_id = c.id WHERE c.id = ? `
		conditions = [ `${ categoryId }` ];
	}

	const categorisedProducts = await appDataSource.query(
		firstQuery + values + secondQuery, conditions
	);

  return categorisedProducts;
}

async function searchProducts(keyWord) {
	const searchedProducts = await appDataSource.query(
		`
			SELECT name, thumbnail_image FROM products
			WHERE name LIKE '${keyWord}%';
		`);

	return searchedProducts;
}

async function getBestSellingProducts(categoryId) {
	let condition = "";
	let variable = "";

	if (categoryId) {
		condition = `WHERE c.id = ? `;
		variable = [categoryId];
	}

	const firstQuery =
	`
	SELECT * FROM (
		SELECT product_id, SUM(quantity) AS totalPurchased 
			FROM order_product
			GROUP BY product_id) AS sub
	INNER JOIN products p ON sub.product_id = p.id
	INNER JOIN categories c ON p.category_id = c.id
	`

	const secondQuery = 
	`
	ORDER BY sub.totalPurchased DESC
	LIMIT 10;
	`

	const productData = await appDataSource.query(
		firstQuery + condition + secondQuery, variable
	);

	return productData;
}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsById,
		searchProducts,
		getBestSellingProducts
}