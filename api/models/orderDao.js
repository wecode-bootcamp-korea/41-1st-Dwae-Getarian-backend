const { appDataSource } = require("../database/database");


async function processOrder(userId, totalCost, products) {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

	try {
		const result = await queryRunner.query(`
			INSERT INTO orders 
				(user_id, total_cost) 
			VALUES (${userId}, ${totalCost})
		`);
	
	const orderId = result.insertId;
	
	const values = products.map((product) => {
		return [ orderId, product.id, product.quantity ];
	});

	await queryRunner.query(`
		INSERT INTO order_product (
			orders_id, 
			product_id, 
			quantity
		) VALUES ?
	`, [values]);
	
	await queryRunner.query(`
		INSERT INTO payment
			(orders_id, payment_type, total_cost)
		VALUES (${orderId}, ${paymentType}, ${totalCost}) 
	`);

	await queryRunner.query(`
		INSERT INTO delivery_address
			(orders_id, address, phone_number)
		VALUES (${orderId}, ${address}, ${phoneNumber})
	`);

	} catch(err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release();
	}

}


async function processDeleteOrder(totalPoint, totalCo2, userId, orderId) {
	const queryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.startTransaction();

  try {
		await queryRunner.query(`
			UPDATE users
    		SET point = ${totalPoint},
				co2 = ${totalCo2}
  		WHERE id = ${userId}
		`) 

		await queryRunner.query(`
			DELETE FROM orders
			WHERE user_id = ${userId} AND order_id = ${Number(orderId)}
		`);
	} catch (err) {
		await queryRunner.rollbackTransaction();
		throw err;
	} finally {
		await queryRunner.release;
	}
}

module.exports = {
	processOrder,
	processDeleteOrder
}

