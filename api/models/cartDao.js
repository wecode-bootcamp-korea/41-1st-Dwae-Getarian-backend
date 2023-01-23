const { appDataSource } = require("../database/database");

async function insertCartItem(userId, productId, quantity) {
	return await appDataSource.query(`
		INSERT INTO CART 
		 (user_id, product_id, quantity)
		VALUES
		 (${userId}, ${productId}, ${quantity})
		ON DUPLICATE KEY UPDATE 
			quantity = quantity + ${quantity}
		`)
}

async function updateCartItems(userId, productId, quantity) {
	await appDataSource.query(`
	UPDATE cart
		SET quantity = ${quantity} 
	WHERE product_id = ${productId}
	AND user_id = ${userId};
`, );
}

async function getCartItem(userId) {
	try {
		return await appDataSource.query(`
		SELECT 
			JSON_ARRAYAGG(JSON_OBJECT(
			"id", p.id, 
			"name", p.name, 
			"image", p.thumbnail_image, 
			"price", p.price, 
			"quantity", c.quantity)) AS data
		FROM cart c
		INNER JOIN users u ON u.id = c.user_id
		INNER JOIN products p ON p.id = c.product_id
		WHERE u.id = ${userId}
		GROUP BY u.id;
	`);
	} catch(err) {
		throw err;
	}

}

async function deleteCartItems(userId, cartItems) {
	try{
		const values = [];

		for (let i = 0; i < cartItems.length; i++) {
			values.push(cartItems[i].id)
		}
		
		return await appDataSource.query(`
			DELETE FROM cart 
			WHERE cart.user_id = ${userId} 
			AND cart.product_id IN (?)`
		, [ values ])
	} catch(err) {
		throw err;
	}
}

module.exports = {
	insertCartItem,
	getCartItem,
	deleteCartItems,
	updateCartItems
}