const cartService = require("../services/cartService");

async function insertCartItems(req, res) {
    const userId = req.params.id;
    const product = req.body;

    const requestResult = await cartService.insertCartItems(userId, product);

    if (!requestResult) {
        const err = new Error("Not Upated Successfully!!! (CART CONTROLLER)");
        err.statusCode = 401;
        throw err;
    }

    return res.status(201).json({ message: "PRODUCT UPDATED SUCCESSFULLY!!! (cartController)"});
}

async function getCartItems(req, res) {
	
}


module.exports = {
	insertCartItems
}