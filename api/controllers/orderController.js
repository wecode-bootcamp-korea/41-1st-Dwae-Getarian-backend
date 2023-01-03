const { createOrdersRequest } = require("../services/orderService");

async function createOrdersRequest(req, res) {
    const { products } = req.body;

    if (!products || !quantity || !userId) 
    return res.status(401).json({ message: "INVALID INPUT (CONTROLLER)" });

    const orderRequest = await createOrdersRequest(userId, products);

    res.status(200).json({ message: "orders completed CONTROLLER", orderRequest});
}



module.exports = {
    createOrdersRequest: createOrdersRequest
}