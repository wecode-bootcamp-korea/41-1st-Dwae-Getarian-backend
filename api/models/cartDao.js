const { appDataSource } = require("../database/database");

async function insertCartItems(userId, product) {
    const requestCartData = await appDataSource.query(
    `
      INSERT INTO cart
        (user_id, product_id, quantity)
      VALUES 
        (?, ?, ?)
    `, [userId, product.id, product.quantity ]);

    return requestCartData;
}

async function getCartItems(userId) {
  const cartData = await appDataSource.query(
    `
      SELECT id FROM cart c
      WHERE c.user_id = ?
    `, [ userId ]);

    return cartData;
}


module.exports = {
	insertCartItems

}