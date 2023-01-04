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
        const query = 
				`
					INSERT INTO order_product 
						(orders_id, product_id, quantity)
        	VALUES ?;
        `
        const values = products.map((product) => {
            return [ orderId, product.id, product.quantity ];
        });
    
        const requestResult = await appDataSource.query(query, [values]);

        return requestResult;

    } catch(err) {
        console.log("ORDER DAO 2")
        throw err;
    }
}

async function deleteOrdersRequest(userId, orderId) {
    try {
			const requestResult = await appDataSource.query(
				`
					DELETE FROM orders
					WHERE user_id = ? AND order_id = ?
				`, [ userId, orderId ]);
	
			return requestResult;
			
		} catch (err) {
			throw err;
		}
}

module.exports = {
    createOrderTable,
    createOrdersRequest,
		deleteOrdersRequest
}