const orderService = require("../services/orderService");

async function createOrdersRequest(req, res) {
	const userId = req.params.id; 
	const orderData = req.body;
	
	if (!orderData  || !userId) {
			return res.status(401).json({ message: "INVALID INPUT (CONTROLLER)" });
	}
	
	const orderRequest = await orderService.createOrdersRequest(userId, orderData);

	if (!orderRequest) {
			return res.status(401).json({ message: "FAILED TO UPDATE (CONTROLLER)" });
	}

	return res.status(200).json({ message: "ORDER SUCCESSFULLY HANDLED CONTROLLER" });
};


async function deleteOrdersRequest(req, res) {
	const userId = req.params.userId;
	const orderId = req.query.orderId;
	const refundData = req.body;

	if (!userId || !orderId || refundData) {
			return res.status(404).json({ message: "INVALID INPUT (CONTROLLER)"});
	}

	const deleteRequest = await deleteOrdersRequest(userId, orderId, refundData);

	if (!deleteRequest) {
			return res.status(401).json({ message: "FAILED TO HANDLE THE REQUEST (CONTROLLER)" });
	}

	return res.status(200).json({ message: "DELETING THE ORDER SUCCESSFULLY HANDLED CONTROLLER" });
};


module.exports = {
	createOrdersRequest,
  deleteOrdersRequest
}