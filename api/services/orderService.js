const orderDatabase = require("../models/orderDao");
const userDatabase = require("../models/userDao");

async function createOrdersRequest(userId, products) {
    const orderRequestData = [];
    const orderDatabaseHandler = new orderDatabase();

    const orderTable = await orderDatabaseHandler
                            .createOrderTable(userId);

    console.log("from orderTable ORDER SERVICE", orderTable);

    let totalCost = 0;
    let orderRequest;

    for (const product of products) {
        orderRequest = await orderDatabaseHandler
        .createOrderTable(ordersId, product.id, product.quantity);

        totalCost += product.quantity * product.price; 
        
        orderRequestData.push(orderRequest);
    }

    const userPoint = await new userDatabase().callUserData("point", userId);
    const updatedUserPoint = userPoint - totalCost;

    if (updatedUserPoint < 0) {
        const err = new Error(
            { message: "NOT ENOUGH MOENY WHY DON'T YOU TOP UP? (ORDER SERVICE)"});
        err.statusCode = 404;
        throw err;
    }

    await new userDatabase().updateUserData(updatedUserPoint, userId);

    return orderRequestData;
}




module.exports = {
    createOrdersRequest: createOrdersRequest
}