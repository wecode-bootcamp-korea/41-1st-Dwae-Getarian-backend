const { appDataSource } = require("../database/database");

async function insertCartItems(userId, product) {
    const requestCartData = await appDataSource.query(
    `
      INSERT INTO cart
        (user_id, product_id, quantity)
      VALUES 
        (?, ?, ?)
    `, [userId, product.id, product.quantity ]);

    return requestCartData;
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


module.exports = {
	insertCartItems,
	getCartItems
}