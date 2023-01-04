const orderModel = require("../models/orderDao");
const userModel = require("../models/userDao");
const paymentModel = require("../models/paymentDao");


async function createOrdersRequest(userId, orderData) {
    const productsData = orderData["products"];
    const deliveryAddress = orderData["delivery_address"];
    const paymentData = orderData.payment["payment"];
    
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

    await paymentModel.updatePayment(ordersId, paymentData);
    const orderRequestData = await orderModel.createOrdersRequest(orderId, productsData);
    
    return orderRequestData;
}


module.exports = {
    createOrdersRequest
}