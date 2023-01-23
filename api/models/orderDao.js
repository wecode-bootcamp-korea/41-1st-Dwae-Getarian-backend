const { appDataSource } = require("../database/database");
const { updateUserDataQuery } = require("./userDao");

async function processOrder(userId, updatedUserPoint, updatedUserCo2, totalCost, products, paymentType, address, phoneNumber) {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const userQuery = await updateUserDataQuery(userId, updatedUserPoint, updatedUserCo2);
	 	await queryRunner.query(userQuery);

		const result = await queryRunner.query(`
			INSERT INTO orders 
				(user_id, total_cost) 
			VALUES (${userId}, ${totalCost})
		`);
	
		const orderId = result.insertId;
		const values = products.map((product) => {
			return [ orderId, product.id, product.quantity ]
	});

	await queryRunner.query(`
		INSERT INTO order_product (
			orders_id, 
			product_id, 
			quantity
		) VALUES ?;
	`, [values]);

	await queryRunner.query(`
		INSERT INTO payment
			(orders_id, payment_type, total_cost)
		VALUES (${orderId}, "${paymentType}", ${totalCost});
	`);

	await queryRunner.query(`
		INSERT INTO delivery_address
			(orders_id, address, phone_number)
		VALUES (${orderId}, "${address}", ${phoneNumber});
	`);

		await queryRunner.commitTransaction();
	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

async function getOrderList(userId) {
	try {
		return await appDataSource.query(`
		SELECT u.name AS user,
			JSON_OBJECT(
				"payment_type", "credit", 
				"user_credit", u.point)         AS payment,
			JSON_ARRAYAGG(JSON_OBJECT(
				"id", p.id, 
				"name", p.name, 
				"price", p.price,
				"image", p.thumbnail_image,
				"quantity", c.quantity))        AS products
		FROM cart c
		INNER JOIN products p ON p.id = c.product_id
		INNER JOIN users u ON u.id = c.user_id
		WHERE u.id = ${userId}
		GROUP BY u.id
	`);
	} catch(err) {
		throw err;
	}

}

async function processDeleteOrder(updatedUserPoint, updatedUserCo2, userId, orderId) {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

  try {
		const userQuery = await updateUserDataQuery(userId, updatedUserPoint, updatedUserCo2);
	 	await queryRunner.query(userQuery);

		await queryRunner.query(`
			DELETE FROM orders
			WHERE user_id = ${userId} AND order_id = ${Number(orderId)}
		`);
		await queryRunner.commitTransaction();
	} catch (err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}
}

module.exports = {
	processOrder,
	processDeleteOrder,
	getOrderList
}

