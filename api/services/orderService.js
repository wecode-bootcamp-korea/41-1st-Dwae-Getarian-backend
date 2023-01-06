const orderModel = require("../models/orderDao");
const userModel = require("../models/userDao");
const paymentModel = require("../models/paymentDao");
const deliveryModel = require("../models/deliveryModel");


async function createOrdersRequest(userId, orderData) {
    const productsData = orderData["products"];
    const deliveryData= orderData["delivery_address"];
    const paymentData = orderData["payment"];

    const totalCost = paymentData["total_cost"];

    // checks if the user has enough finances to pay the totalCost;
    const userPointData = await userModel.callUserData("point", userId);
    const userPoint = userPointData[0].point;
    const userPointAfterPayment = userPoint - totalCost;

    if (userPointAfterPayment < 0) {
        const err = new Error("NOT ENOUGH MOENY WHY DON'T YOU TOP UP? (ORDER SERVICE)");
        err.statusCode = 404;
        throw err;
    }

    // then updates it on the userData to the userPoint;
    await userModel.updateUserData(userPointAfterPayment, userId); 

    // then create an order table for the user;
    const orderTable = await orderModel.createOrderTable(userId);
    const orderId = orderTable.insertId;

    await deliveryModel.updateDelivery(orderId, deliveryData)
    await paymentModel.updatePayment(orderId, paymentData);

    const orderRequestData = await orderModel.createOrdersRequest(orderId, productsData);
    
    return orderRequestData;
}

async function deleteOrdersRequest(userId, orderId) {
    const requestResult = await orderModel.deleteOrdersRequest(userId, orderId);

    return requestResult;
}


module.exports = {
    createOrdersRequest,
    deleteOrdersRequest
}