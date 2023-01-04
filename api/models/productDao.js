const { appDataSource } = require("../database/database");

async function getAllProducts() {
    const allProducts = await appDataSource.query(
    `
    	SELECT * FROM products;
    `);

    return allProducts;
}

async function getSpecificProduct(productId) {
    try {
        const product = await appDataSource.query(
					`
						SELECT * FROM products p 
							INNER JOIN categories c 
							ON c.id = p.category_id
            WHERE p.id = ? 
          `, [ productId ]);
        
            return product;
            
    } catch(err) {
        throw err;
    }

}

async function getCategorisedProducts(categoryId, displayOption) {
	let values = "";
	let conditions = "";

	console.log(displayOption);
	console.log(categoryId)

	const query = 
	`
		SELECT * FROM products p 
			ORDER BY prices ${displayOption}
 	`;

	if (categoryId) {
		values = `INNER JOIN categories c ON p.category_id = c.id WHERE c.id = ?`
		conditions = [ `${categoryId}` ];
	}

  console.log(query + values, conditions)
	const categorisedProducts = await appDataSource.query(
		query + values, conditions
	);


    return categorisedProducts;
}



module.exports = {
    getAllProducts,
    getCategorisedProducts,
    getSpecificProduct
}