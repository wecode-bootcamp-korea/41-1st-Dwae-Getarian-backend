const { appDataSource } = require("../database/database");

async function updateDelivery(ordersId, deliveryData) {
	const delivery = await appDataSource.query(
		`
			INSERT INTO delivery_address
				(orders_id, address, phone_number)
			VALUES
				(?, ?, ?)
		`, [ ordersId, deliveryData["address"], deliveryData["phone_number"] ]);
		
	return delivery; 
}

module.exports = {
	updateDelivery
}