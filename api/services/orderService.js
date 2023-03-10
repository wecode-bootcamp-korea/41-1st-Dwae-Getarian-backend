const { detectError } = require("../util/detectError");
const orderModel = require("../models/orderDao");
const userModel = require("../models/userDao");


async function createOrder(userId, orderData) {
  const { products, deliveryAddress: { phoneNumber, address }, payment: { totalCost, paymentType }, totalCo2 } = orderData;
  const [ userData ] = await userModel.getUserData(userId);

  if (userData["point"] - totalCost < 0) detectError("NOT ENOUGH MONEY MAYBE TOP UP ONE?", 401);

  await orderModel.processOrder(
		userId, 
		`${userData["point"] - totalCost}`, 
		`${userData["co2"] + totalCo2}`,
		totalCost,
		products, 
		paymentType, 
		address, 
		phoneNumber
	);
}

async function getOrderList(userId) {
	return await orderModel.getOrderList(userId);
}

async function deleteOrder(userId, orderId, totalCost, totalCo2) {
	const [ userData ] = await userModel.getUserData(userId);

	await orderModel.processDeleteOrder(
		`${userData["point"] + totalCost}`,
		`${userData["co2"] + totalCo2}`,
		userId,
		orderId
	);
}


module.exports = {
  createOrder,
  deleteOrder,
	getOrderList
}