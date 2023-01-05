const { appDataSource } = require("../database/database");

async function upsertCart(userId, product) {
    const cartData = await appDataSource.query(
    `
      INSERT INTO cart
        (user_id, product_id, quantity)
      VALUES 
        (?)
    `, [userId, product.id, product.quantity ]);

    return cartData;
}

async function getCart(userId) {
  const cartData = await appDataSource.query(
    `
      SELECT id FROM cart c
      WHERE c.user_id = ?
    `, [ userId ]);

    return cartData;
}


module.exports = {
    upsertCart
    getCart,
}