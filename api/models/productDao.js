const { appDataSource } = require("../database/database");
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
	try {
		const queryBuilder = new QueryBuilder(queryParams.categoryId, 1, 2, 3);

		const sql = queryBuilder.buildQuery();		
		
		// console.log(`
		// SELECT 
		// 	products.id 								AS id, 
		// 	products.name 							AS name, 
		// 	products.thumbnail_image 		AS image, 
		// 	products.price 							AS price
		// FROM products 
		// INNER JOIN categories 
		// 	ON products.category_id = categories.id 
		// ${whereClause}
		// `);

		return await appDataSource.query(`
		SELECT 
			products.id 								AS id, 
			products.name 							AS name, 
			products.thumbnail_image 		AS image, 
			products.price 							AS price
		FROM products 
		INNER JOIN categories 
			ON products.category_id = categories.id 
		${whereClause}
		`);
	} catch(err) {
		throw err;
	}
}

async function searchProducts(keyWord) {
	try {
		return await appDataSource.query(`
		SELECT name, thumbnail_image FROM products
			WHERE name LIKE '${keyWord}%' 
 			OR name LIKE '%${keyWord}%'
 			OR name LIKE '%${keyWord}'
	`);
	} catch(err) {
		throw err;
	}
}

async function getBestSellingProducts(queryParams) {
	try {
		const queryBuilder = new QueryBuilder(queryParams);
		const extraSql = await queryBuilder.buildQuery();
	
		return await appDataSource.query(`
			SELECT 
				products.id 											AS id,
				products.name 										AS name,
				products.thumbnail_image 					AS image,
				products.price 										AS price,
				sub.totalPurchased 								AS sales
			FROM (
				SELECT product_id, SUM(quantity) 	AS totalPurchased 
					FROM order_product
					GROUP BY product_id) AS sub
			INNER JOIN products ON sub.product_id = products.id
			INNER JOIN categories ON categories.id = products.category_id
			${extraSql}
		`
		);
	} catch(err) {
		throw err;
	}
}


module.exports = {
  getProducts,
  getProductsById,
	searchProducts,
	getBestSellingProducts
}