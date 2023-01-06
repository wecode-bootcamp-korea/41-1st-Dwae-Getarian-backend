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
	const userId = req.params.id;

	const cartItems = await cartService.getCartItems(userId);

	if (!cartItems.length) {
		return res.status(404).json({ message: "NO FOLLOWING PRODUCTS TRY PUTTTING SOME ITEMS!!!" });
	}

	return res.status(200).json(cartItems);
}

async function deleteCartItems(req, res) {
	const userId = req.body.userId;
	const cartId = req.body.cartId;

	const requestResult = await cartService.deleteCartItems(userId, cartId);

	if (!requestResult) {
		return res.status(401).json({ message: "delete request failed to handle" })
	}

	return res.status(200).json({ message: "delete request handled successfully" })
	
} 


module.exports = {
	insertCartItems,
	getCartItems,
	deleteCartItems
}