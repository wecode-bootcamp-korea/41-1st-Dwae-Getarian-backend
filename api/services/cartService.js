const cartModel = require("../models/cartDao");

async function insertCartItems(userId, product) {
    const result = await cartModel.insertCartItems(userId, product);

    return result;
}

async function getCartItems(userId) {
	const cartItems = await cartModel.getCartItems(userId);

	return cartItems;
}


module.exports = {
	insertCartItems,
	getCartItems
}