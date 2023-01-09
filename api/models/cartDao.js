const { appDataSource } = require("../database/database");

async function insertCartItems(userId, product) {
	const checkResult = await checkCartItems(userId, product["product_id"]);

	if (!checkResult) {
    const requestCartData = await appDataSource.query(
			`
				INSERT INTO cart
					(user_id, product_id, quantity)
				VALUES 
					(?, ?, ?)
			`, [ userId, product["product_id"], product.quantity ]);
	
			return requestCartData;
	} else {
		const requestCartData = await appDataSource.query(
			`
				UPDATE cart
					SET quantity = ?
				WHERE id = ?;
			`, [ product.quantity + checkResult.quantity, checkResult.id ]);
	
			return requestCartData;
	}
}

async function getCartItems(userId) {
  const cartData = await appDataSource.query(
	`
	SELECT u.name AS username, (
		JSON_ARRAYAGG(
			JSON_OBJECT(
				"product_id", p.id,
				"product_name", p.name,
				"product_image", p.thumbnail_image, 
				"price", p.price,
				"quantity", c.quantity))) AS products
	FROM cart c
	INNER JOIN users u ON u.id = c.user_id
	INNER JOIN products p ON p.id = c.product_id
	WHERE u.id = ?
	GROUP BY u.id;
	`, [ userId ]);

    return cartData;
}

async function checkCartItems(userId, productId) {
	const checkItems = await appDataSource.query(
		`
			SELECT * FROM cart c
			WHERE c.user_id = ? AND c.product_id = ?
		`, [ userId, productId ]);

		if (checkItems.length === 0) {
			return 0;
		} 

		const dataObj = {
			id: checkItems[0].id,
			quantity: checkItems[0].quantity
		}

		return dataObj;
} 

async function deleteCartItems(rawQuery, condition, values) {
	const deleteRequest = await appDataSource.query(
		rawQuery + condition
	, [ values ])

	return deleteRequest;
}

module.exports = {
	insertCartItems,
	getCartItems,
	deleteCartItems
}