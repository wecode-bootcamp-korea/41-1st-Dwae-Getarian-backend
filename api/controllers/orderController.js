const orderService = require("../services/orderService");
const { detectError } = require("../util/detectError");
 
async function createOrder(req, res) {
	const userId = req.userId; 
	const orderData = req.body;
	
	if (!orderData || !userId) detectError("NO INPUT DATA", 401);
	
	await orderService.createOrder(userId, orderData);

	return res.status(200).json({ message: "ORDER SUCCESSFULLY HANDLED" });
};

async function getOrderList(req,res) {
	const userId = req.userId;
	const userProductData = await orderService.getOrderList(userId);
	
	return res.status(200).json(userProductData);
}

async function deleteOrder(req, res) {
	const userId = req.userId;
	const orderId = req.query.orderId;
	const { totalCost, totalCo2 } = req.body;

	if (!orderId || !totalCost || !totalCo2) detectError("INPUT ERROR", 401);
	
	await orderService.deleteOrder(userId, orderId, totalCost, totalCo2);

	return res.status(200).json({ message: "DELETING THE ORDER SUCCESSFULLY HANDLED" });
};


module.exports = {
	createOrder,
  deleteOrder,
	getOrderList
}