const cartService = require("../services/cartService");
const { detectError } = require("../util/detectError");

async function insertCartItem(req, res) {
	const userId = req.userId;
	const { productId, quantity } = req.body;

	if (!productId || !quantity) detectError("NO INPUT DATA", 401);

	await cartService.insertCartItem(userId, productId, quantity);

	return res.status(201).json({ message: "PRODUCT UPDATED SUCCESSFULLY!!! (cartController)"});
}

async function getCartItems(req, res) {
	const userId = req.userId;
	const cartItems = await cartService.getCartItem(userId);

	if (!cartItems.length) detectError("NO FOLLOWING PRODUCTS TRY PUTTTING SOME ITEMS!!!", 401);
	
	return res.status(200).json(cartItems);
}

async function deleteCartItems(req, res) {
	const userId = req.userId;
	const cartItems = req.body["cart_items"];

	if (!cartItems) detectError("NO INPUT", 401);

	await cartService.deleteCartItems(userId, cartItems);

	return res.status(200).json({ message: "delete request handled successfully" })
} 


module.exports = {
	insertCartItem,
	getCartItems,
	deleteCartItems
}