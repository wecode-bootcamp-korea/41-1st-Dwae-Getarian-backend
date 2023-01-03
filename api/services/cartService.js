const postModel = require("../models/cartDao");

async function postCartItems() {
    const result = await postModel.postCartItems(userId, product);

    return result;
}


module.exports = {
    postCartItems
}