const orderService = require("../services/orderService");

async function createOrder(req, res) {
	const userId = req.id; 
	const orderData = req.body;
	
	if (!orderData  || !userId) {
		const err = new Error("KEY ERROR");
		err.status = 401;

		throw err;
	}
	
	const orderRequest = await orderService.createOrder(userId, orderData);

	if (!orderRequest) {
		const err = new Error("DATABASE ERROR");
		err.status = 401;

		throw err;
	}

	return res.status(200).json({ message: "ORDER SUCCESSFULLY HANDLED" });
};


async function deleteOrder(req, res) {
	const userId = req.id;
	const orderId = req.query.orderId;
	const { total_cost, total_co2 } = req.body;

	if (!userId || !orderId || !total_cost || !total_co2) {
		const err = new Error("INPUT ERROR");
		err.status = 401;

		throw err;
	}

	const deleteRequest = await orderService.deleteOrder(userId, orderId, total_cost, total_co2);

	if (!deleteRequest) {
		const err = new Error("DATABASE ERROR");
		err.status = 401;

		throw err;
	}

	return res.status(200).json({ message: "DELETING THE ORDER SUCCESSFULLY HANDLED" });
};


module.exports = {
	createOrder,
  deleteOrder
}