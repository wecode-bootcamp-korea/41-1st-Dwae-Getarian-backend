const { appDataSource } = require("../database/database");


async function createOrderTable(userId) {
    try {
        const orderTable = await appDataSource.query(
            `
            INSERT INTO orders
                (user_id) 
            VALUES (?)
        `, [ userId ]);
        return orderTable;
    } catch(err) {
        console.log("ORDER DAO1")
        throw err;
    } 

}

async function createOrdersRequest(orderId, products) {
    try {
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
    } catch(err) {
        console.log("ORDER DAO 2")
        throw err;
    }
}

module.exports = {
    createOrderTable,
    createOrdersRequest
}