const cartModel = require("../models/cartDao");

async function insertCartItem(userId, product) {
    const result = await cartModel.insertCartItems(userId, product);

    return result;
}

async function getCartItem(userId) {
	const cartItems = await cartModel.getCartItems(userId);

	return cartItems;
}

async function deleteCartItems(userId, cartItems) {
	const values = [];
	const rawQuery = `DELETE FROM cart `
	const condition = `WHERE cart.user_id = ${userId} AND cart.id IN (?)`

	for (let i = 0; i < cartItems.length; i++) {
		values.push(cartItems[i].id)
	}

	const deleteRequest = await cartModel.deleteCartItems(rawQuery, condition, values);

	return deleteRequest;
}

module.exports = {
	insertCartItem,
	getCartItem,
	deleteCartItems
}