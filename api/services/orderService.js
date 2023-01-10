const orderModel = require("../models/orderDao");
const userModel = require("../models/userDao");
const paymentModel = require("../models/paymentDao");
const deliveryModel = require("../models/deliveryModel");


async function createOrder(userId, orderData) {
    const { products, delivery_address, payment, total_co2 } = orderData;
    const totalCost = payment["total_cost"];

    // checks if the user has enough finances to pay the totalCost;
    const [ userPointData ] = await userModel.callUserData("point", userId);
    const userPoint = userPointData["point"];
    const userPointAfterPayment = userPoint - totalCost;

    if (userPointAfterPayment < 0) {
        const err = new Error("NOT ENOUGH MOENY WHY DON'T YOU TOP UP?");
        err.statusCode = 404;
        throw err;
    }

    // then updates it on the userData to the userPoint;
    await userModel.updateUserData(userPointAfterPayment, total_co2, userId); 

    // then create an order table for the user;
    const orderTable = await orderModel.createOrderTable(userId, totalCost);
    const orderId = orderTable.insertId;

    await deliveryModel.updateDelivery(orderId, delivery_address)
    await paymentModel.updatePayment(orderId, payment);

    const orderRequestData = await orderModel.createOrder(orderId, products);
    
    return orderRequestData;
}

async function deleteOrder(userId, orderId, refundData) {
	const userCurrentPoint = await userModel.callUserData("point", userId);
	const userCurrentCo2 = await userModel.callUserData("co2", userId);

	const updatedPoint = userCurrentPoint + refundData["total_cost"];
	const updatedCo2 = userCurrentCo2 + refundData["total_co2"];

	const customerRefund = await userModel.updateUserData(updatedPoint, updatedCo2, userId);
	
  const requestResult = await orderModel.deleteOrder(userId, orderId);

  return requestResult;
}


module.exports = {
    createOrder,
    deleteOrder
}