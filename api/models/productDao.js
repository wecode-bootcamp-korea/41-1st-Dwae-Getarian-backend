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
							INNER JOIN categories c 
							ON c.id = p.category_id
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

	const firstQuery = `SELECT * FROM products p `;

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

async function getBestSellingProducts() {
	const values = [];

	const productData = await appDataSource.query(
		`
			SELECT id FROM products
		`);

	for (const product of productData) {
		const array = [];
		array.push(product.id)
		values.push(array);
	}

	const productPurchaseData = await appDataSource.query(
		`
		SELECT product_id, SUM(quantity) AS totalPurchased 
			FROM order_product
		WHERE product_id = ?;
		`, values);

	return productPurchaseData;
}


module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductsById,
		searchProducts,
		getBestSellingProducts
}