const orderService = require("../services/orderService");

async function createOrder(req, res) {
	const userId = req.id; 
	const orderData = req.body;
	
	if (!orderData  || !userId) {
			return res.status(401).json({ message: "INVALID INPUT (CONTROLLER)" });
	}
	
	const orderRequest = await orderService.createOrder(userId, orderData);

	if (!orderRequest) {
			return res.status(401).json({ message: "FAILED TO UPDATE (CONTROLLER)" });
	}

	return res.status(200).json({ message: "ORDER SUCCESSFULLY HANDLED CONTROLLER" });
};


async function deleteOrder(req, res) {
	const userId = req.id;
	const orderId = req.query.orderId;
	const refundData = req.body;

	if (!userId || !orderId || refundData) {
			return res.status(404).json({ message: "INVALID INPUT (CONTROLLER)"});
	}

	const deleteRequest = await deleteOrder(userId, orderId, refundData);

	if (!deleteRequest) {
			return res.status(401).json({ message: "FAILED TO HANDLE THE REQUEST (CONTROLLER)" });
	}

	return res.status(200).json({ message: "DELETING THE ORDER SUCCESSFULLY HANDLED CONTROLLER" });
};


module.exports = {
	createOrder,
  deleteOrder
}