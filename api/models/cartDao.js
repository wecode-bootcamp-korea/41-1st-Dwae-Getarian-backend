const { appDataSource } = require("../database/database");

async function createCart(userId) {
    const cartData = await appDataSource.query(
    `
      INSERT INTO cart
        (user_id)
      VALUES 
        (?)
    `, [userId]);

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

async function postCartItems(userId, product) {
    const result = await appDataSource.query(
    `
    INSERT INTO cart_product

    `)
}

module.exports = {
    createCart,
    getCart,
    postCartItems
}