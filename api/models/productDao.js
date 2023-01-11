const { appDataSource } = require("../database/database");
const { queryBuilder }  = require("./product.query");




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
	const sortMapper = Object.freeze({
		price_high: `price DESC `,
		price_low: `price ASC `,
		new: `created_at DESC `,
		old: `created_at ASC `,
	});


	const orderClauseBuilder = (queryParams) => {
		console.log("orderClauseBuilder", queryParams)
		Object.entries(queryParams).map(([key, values]) => {
			console.log("order????", values)
			let endOrderClause = sortMapper[values];
			return endOrderClause;
		})
	} 

	console.log("!!!!!", orderClauseBuilder(queryParams));

	
	// return await appDataSource.query(`
	// SELECT 
	// 	products.id 								AS id, 
	// 	products.name 							AS name, 
	// 	products.thumbnail_image 		AS image, 
	// 	products.price 							AS price
	// FROM products 
	// INNER JOIN categories 
	// 	ON products.category_id = categories.id 
	// 	${whereClause}
	// 	${orderClause}
	// 	${LimitClause}
	// `);
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
    getProducts,
    getProductsById,
		searchProducts,
		getBestSellingProducts
}