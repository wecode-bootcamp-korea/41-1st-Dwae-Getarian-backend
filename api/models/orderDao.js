const appDataSource = require("../database/database");

class Order {
    constructor() {
        console.log("HIIIIII"); 
    }

    async createOrderTable(userId) {
        const orderTable = await appDataSource.query(
            `
            INSERT INTO orders
                (user_id) 
            VALUES 
                (?)
        `, [ userId ]);
        console.log("from order DAO order table result", orderTable);
        return orderTable;
    }

    async createOrdersRequest(ordersId, productId, quantity) {
        const result = await appDataSource.query(
            `
            INSERT INTO order_product
                (order_id, product_id, quantity)
            VALUES 
                (?, ?, ?)
        `, [ ordersId, productId, quantity ]);

        return result;
    }

    
}


module.exports = Order;