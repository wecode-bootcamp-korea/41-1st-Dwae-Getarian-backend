const cartService = require("../services/cartService");

async function postCartItems(req, res) {
    const userId = req.params.id;
    const product = req.body;

    const result = await cartService.postCartItems(userId, product);

    if (!result) {
        const err = new Error("Not Upated Successfully!!! (CART CONTROLLER)");
        err.statusCode = 401;
        throw err;
    }

    return res.status(201).json({ message: "PRODUCT UPDATED SUCCESSFULLY!!! (cartController)"});
}


module.exports = {
    postCartItems
}