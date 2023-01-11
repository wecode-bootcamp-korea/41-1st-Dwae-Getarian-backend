const { appDataSource } = require("../database/database");
const { queryBuilder }  = require("./product.query");

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

async function getProductsByCategory(queryParams) {
	const { joinClause, orderClause, whereClause, pageClause } = await queryBuilder(queryParams);

	const rawQuery = `
	SELECT 
		products.id AS id, 
		products.name AS name, 
		products.thumbnail_image AS image, 
		products.price AS price
	FROM products `;
	
	const categorisedProducts = await appDataSource.query(
		rawQuery + joinClause + whereClause + orderClause + pageClause
	);


  return categorisedProducts;
}

async function searchProducts(keyWord) {
	const { searchClause } = await queryBuilder(keyWord);

	const rawQuery = 
	`
	SELECT name, thumbnail_image FROM products
	`

	const searchedProducts = await appDataSource.query(
		rawQuery + searchClause
);

	return searchedProducts;
}

async function getBestSellingProducts(queryParams) {

	const { joinClause, orderClause, whereClause, pageClause } = await queryBuilder(queryParams);

	const rawQuery =
	`
	SELECT 
		products.name AS name,
		products.thumbnail_image AS image,
		products.price AS price,
		sub.totalPurchased AS sales
	FROM (
		SELECT product_id, SUM(quantity) AS totalPurchased 
			FROM order_product
			GROUP BY product_id) AS sub
	INNER JOIN products ON sub.product_id = products.id
	`

	const productData = await appDataSource.query(
		rawQuery + joinClause + orderClause + whereClause + pageClause
	);

	return productData;
}


module.exports = {
    getProductsByCategory,
    getProductsById,
		searchProducts,
		getBestSellingProducts
}