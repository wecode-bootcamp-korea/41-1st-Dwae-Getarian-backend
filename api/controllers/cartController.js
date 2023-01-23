const cartService = require("../services/cartService");
const { detectError } = require("../util/detectError");

async function insertCartItem(req, res) {
	const userId = req.userId;
	const { productId, quantity } = req.body;

	if (!productId || !quantity) detectError("NO INPUT DATA", 401);

	await cartService.insertCartItem(userId, productId, quantity);

	return res.status(201).json({ message: "PRODUCT UPDATED SUCCESSFULLY!!!"});
}

async function getCartItems(req, res) {
	const userId = req.userId;
	const cartItems = await cartService.getCartItem(userId);

	if (cartItems.length) return res.status(200).json(cartItems[0]["data"]);
	else return res.status(400).json([]);
}

async function updateCartItems(req, res) {
	const { productId, quantity } = req.body;
	const userId = req.userId;

	if (!productId || !quantity) return detectError("NO ITEMS TO BE UPDATED", 401); 
	
	await cartService.updateCartItems(userId, productId, quantity);

	res.status(201).json("CART ITEMS UPDATED SUCCESSFULLY!");
}

async function deleteCartItems(req, res) {    
	const userId = req.userId;
	const cartItems = req.body;

	if (!cartItems.length) detectError("NO INPUT", 401);

	await cartService.deleteCartItems(userId, cartItems);

	return res.status(200).json({ message: "DELETE REQUEST HANDLED SUCCESSFULLY" })
} 


module.exports = {
	insertCartItem,
	getCartItems,
	deleteCartItems,
	updateCartItems
}