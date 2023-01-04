const { appDataSource } = require("../database/database");


async function updatePayment(ordersId, paymentData) {
	const payment = await appDataSource.query(
		`
			INSERT INTO payment
				(orders_id, payment_type, total_cost)
			VALUES 
				(?, ?, ?)
		`, [ ordersId, paymentData["payment_type"], paymentData["total_cost"] ]);

		return payment;
}


module.exports = {
	updatePayment 
}