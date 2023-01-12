const cartService = require("../services/cartService");

async function insertCartItem(req, res) {
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

	const products = cartItems[0].products;

	return res.status(200).json(products);
}

async function deleteCartItems(req, res) {
	const userId = req.id;
	const cartItems = req.body["cart_items"];

	const requestResult = await cartService.deleteCartItems(userId, cartItems);

	if (!requestResult) {
		return res.status(401).json({ message: "delete request failed to handle" })
	}

	return res.status(200).json({ message: "delete request handled successfully" })
} 


module.exports = {
	insertCartItem,
	getCartItems,
	deleteCartItems
}