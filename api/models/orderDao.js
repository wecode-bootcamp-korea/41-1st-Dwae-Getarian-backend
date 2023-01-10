const { appDataSource } = require("../database/database");


async function createOrderTable(userId, totalCost) {
	try {
		return await appDataSource.query(
			`
			INSERT INTO orders 
				(user_id, total_cost) 
			VALUES (?, ?)
			`, [ userId, totalCost ]);
			
	} catch(err) {
			throw err;
	} 
}

async function createOrder(orderId, products) {
    try {
			const values = products.map((product) => {
				return [ orderId, product.id, product.quantity ];
		});

		return appDataSource.query(
		`
		INSERT INTO order_product (
			orders_id, 
			product_id, 
			quantity
		) VALUES ?;
		`, [values]);

    } catch(err) {
      throw err;
    }
}

async function deleteOrder(userId, orderId) {
    try {
			return await appDataSource.query(
				`
					DELETE FROM orders
					WHERE user_id = ? AND order_id = ?
				`, [ userId, orderId ]);
			
		} catch (err) {
			throw err;
		}
}

module.exports = {
    createOrderTable,
    createOrder,
		deleteOrder
}