const cartModel = require("../models/cartDao");

async function insertCartItems(userId, product) {
    const result = await cartModel.insertCartItems(userId, product);

    return result;
}


module.exports = {
	insertCartItems
}