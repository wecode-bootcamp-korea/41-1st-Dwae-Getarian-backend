const cartModel = require("../models/cartDao");

async function insertCartItem(userId, productId, quantity) {
  const result = await cartModel.insertCartItem(userId, productId, quantity);

  return result;
}

async function getCartItem(userId) {
	const cartItems = await cartModel.getCartItem(userId);
	
	return cartItems;
}

async function deleteCartItems(userId, cartItems) {
	const deleteRequest = await cartModel.deleteCartItems(userId, cartItems);

	return deleteRequest;
}

module.exports = {
	insertCartItem,
	getCartItem,
	deleteCartItems
}