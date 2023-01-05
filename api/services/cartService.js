const cartModel = require("../models/cartDao");

async function postCartItems(userId, product) {
    const result = await cartModel.postCartItems(userId, product);

    return result;
}


module.exports = {
    postCartItems
}