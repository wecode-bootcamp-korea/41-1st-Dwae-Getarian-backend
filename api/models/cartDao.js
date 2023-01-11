const { appDataSource } = require("../database/database");

async function insertCartItem(userId, productId, quantity) {
	const checkResult = await checkCartItems(userId, productId);

	if (!checkResult) {
    const requestCartData = await appDataSource.query(`
			INSERT INTO cart
				(user_id, product_id, quantity)
			VALUES 
				(${userId}, ${productId}, ${quantity})
		`);
	
			return requestCartData;
	} else {
		const requestCartData = await appDataSource.query(`
			UPDATE cart
				SET quantity = ${quantity + checkResult.quantity}
			WHERE id = ${checkResult.id};
		`);
	
		return requestCartData;
	}
}

async function getCartItems(userId) {
	return await appDataSource.query(`
	SELECT 
		JSON_ARRAYAGG(JSON_OBJECT(
		"id", p.id, 
		"name", p.name, 
		"image", p.thumbnail_image, 
		"price", p.price, 
		"category", c.quantity)) AS data
	FROM cart c
	INNER JOIN users u ON u.id = c.user_id
	INNER JOIN products p ON p.id = c.product_id
	WHERE u.id = ${userId}
	GROUP BY u.id;
	`);

}

async function checkCartItems(userId, productId) {
	const checkItems = await appDataSource.query(`
		SELECT * FROM cart c
		WHERE c.user_id = ${userId} AND c.product_id = ?
	`, [ productId ]);

		if (checkItems.length === 0) {
			return 0;
		} 

		const dataObj = {
			id: checkItems[0].id,
			quantity: checkItems[0].quantity
		}

		return dataObj;
} 

async function deleteCartItems(userId, cartItems) {
	const values = [];

	for (let i = 0; i < cartItems.length; i++) {
		values.push(cartItems[i].id)
	}

	return await appDataSource.query(`
		DELETE FROM cart 
		WHERE cart.user_id = ${userId} 
		AND cart.id IN (?)`
	, [ values ])
}

module.exports = {
	insertCartItem,
	getCartItems,
	deleteCartItems
}