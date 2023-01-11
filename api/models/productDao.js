const { appDataSource } = require("../database/database");
const { queryBuilder }  = require("./product.query");
const QueryBuilder = require("./productList.query");

async function getProductsById(productId) {
	try {
		return await appDataSource.query(`
			SELECT * FROM products p 
			WHERE p.id = ? 
		`, [ productId ]);					
	} catch(err) {
		throw err;
	}
}

async function getProducts(queryParams) {

	const queryBuilder = new QueryBuilder(queryParams);
	const extraSql = queryBuilder.buildQuery();

	return await appDataSource.query(`
	SELECT 
		products.id 								AS id, 
		products.name 							AS name, 
		products.thumbnail_image 		AS image, 
		products.price 							AS price
	FROM products 
	INNER JOIN categories 
		ON products.category_id = categories.id 
	${extraSql}
	`);
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

	const queryBuilder = new QueryBuilder(queryParams);
	const extraSql = await queryBuilder.buildQuery();

	return await appDataSource.query(`
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
		${extraSql}
	`
	);
}


module.exports = {
    getProducts,
    getProductsById,
		searchProducts,
		getBestSellingProducts
}