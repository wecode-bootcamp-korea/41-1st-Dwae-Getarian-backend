const { createOrdersRequest } = require("../services/orderService");

async function ordersRequest(req, res, next) {
    try {
        const userId = req.params.id; 
        const products = req.body;
    
        if (!products || !userId) {
            return res.status(401).json({ message: "INVALID INPUT (CONTROLLER)" });
        }
        
        const orderRequest = await createOrdersRequest(userId, products);
    
        if (!orderRequest) {
            return res.status(401).json({ message: "FAILED TO UPDATE (CONTROLLER)" });
        }
    
        return res.status(200).json({ message: "orders completed CONTROLLER" });

    } catch(err) {
        next(err);
    }
}


module.exports = {
    ordersRequest
}