

const orderModel = require("../models/orderDao");
const userModel = require("../models/userDao");

async function createOrdersRequest(userId, products) {

    const orderTable = await orderModel.createOrderTable(userId);

    // 여기서 어떻게 order Id 를 뽑을지 구상
    const orderId = orderTable.insertId;

    let totalCost = 0;

    for (const product of products) {
        totalCost += product.quantity * product.price; 
    }

    console.log("totalCost", totalCost);


    const userPointData = await userModel.callUserData("point", userId);
    const userPoint = userPointData[0].point;

    const updatedUserPoint = userPoint - totalCost;

    if (updatedUserPoint < 0) {
        const err = new Error(
            { message: "NOT ENOUGH MOENY WHY DON'T YOU TOP UP? (ORDER SERVICE)"});
        err.statusCode = 404;
        throw err;
    }

    await userModel.updateUserData(updatedUserPoint, userId);

    const orderRequestData = await orderModel.createOrdersRequest(orderId, products);

    return orderRequestData;
}


module.exports = {
    createOrdersRequest
}