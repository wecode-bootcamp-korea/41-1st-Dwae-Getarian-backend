const orderService = require("../services/orderService");

async function createOrdersRequest(req, res, next) {
    try {
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

    } catch(err) {
        next(err);
    }
}

async function deleteOrdersRequest(req, res, next) {
    try {
        const userId = req.params.userId;
        const orderId = req.query.orderId;
    
        if (!userId || !orderId) {
            return res.status(404).json({ message: "INVALID INPUT (CONTROLLER)"});
        }
    
        const deleteRequest = await deleteOrdersRequest(userId, orderId);
    
        if (!deleteRequest) {
            return res.status(401).json({ message: "FAILED TO HANDLE THE REQUEST (CONTROLLER)" });
        }
    
        return res.status(200).json({ message: "DELETING THE ORDER SUCCESSFULLY HANDLED CONTROLLER" });
    } catch(err) {
        next(err);
    }

}


module.exports = {
    createOrdersRequest,
    deleteOrdersRequest
}