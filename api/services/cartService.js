const cartModel = require("../models/cartDao");

async function insertCartItem(userId, productId, quantity) {
  return await cartModel.insertCartItem(userId, productId, quantity);
}

async function getCartItem(userId) {
	return await cartModel.getCartItems(userId);
}

async function deleteCartItems(userId, cartItems) {
	return await cartModel.deleteCartItems(userId, cartItems);

}

module.exports = {
	insertCartItem,
	getCartItem,
	deleteCartItems
}