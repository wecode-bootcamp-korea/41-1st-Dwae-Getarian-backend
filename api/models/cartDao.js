const { appDataSource } = require("../database/database");

async function createCart() {
    const cartData = await appDataSource.query(
    `
    INSERT INTO cart
    
    `)
}

async function postCartItems(userId, product) {
    const result = await appDataSource.query(
    `
    INSERT INTO cart_product

    `)
}

module.exports = {
    createCart,
    postCartItems
}