const { appDataSource } = require("../database/database");


async function createOrderTable(userId) {
    const orderTable = await appDataSource.query(
        `
        INSERT INTO orders
            (user_id) 
        VALUES (?)
    `, [ userId ]);
    return orderTable;
}

async function createOrdersRequest(orderId, products) {
    const query = `
        INSERT INTO order_product
            (orders_id, product_id, quantity)
        VALUES ?;
        `

    const values = products.map((product) => {
        return [ orderId, product.id, product.quantity ];
    });
    
    const result = await appDataSource.query(query, [values]);

    return result;
}

module.exports = {
    createOrderTable,
    createOrdersRequest
}