const orderFilter = {
	price_high: `ORDER BY price DESC `,
	price_low: `ORDER BY price ASC `,
	new: `ORDER BY created_at DESC `,
	old: `ORDER BY created_at ASC `,
	best: `ORDER BY sub.totalPurchased DESC `
}

const joinFilter = {
	category: `INNER JOIN categories ON products.category_id = categories.id `
}

const whereFilter = {
	category: (value) => {return `WHERE categories.id = ${value} `}
}

const pageFilter = {
	list_10: `LIMIT 10 `,
	list_8: `LIMIT 8`
}

const searchFilter = {
	keyword: (keyWord) => {return `WHERE WHERE name LIKE '${keyWord}%' 
	OR name LIKE '%${keyWord}%'
	OR name LIKE '%${keyWord}'`}
}

function checkSpecial(str) {
	const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

	if(special_pattern.test(str) == true) {
		return true;
	} else {
		return false;
	}
}
 
function queryBuilder(options) {
	let categoryId = options.categoryId || "";
	let page = options.page || "";
	let sortBy = options.sortBy || "";
	let search = options.search || "";
	
	let joinClause = "";
	let orderClause = "";
	let whereClause = "";
	let pageClause = "";
	let searchClause = "";

	if (categoryId && !isNaN(Number(categoryId))) {
		const value = categoryId
		whereClause = whereFilter["category"](value); 
		joinClause = joinFilter["category"];
	} 

	if (page) {
		pageClause = pageFilter[page];
	}
	
	if (sortBy) {
		orderClause = orderFilter[sortBy]
	}

	if (search && !checkSpecial(search)) {
		searchClause = searchFilter["keyword"](search);
	}

	return { joinClause, orderClause, whereClause, pageClause, searchClause };
}


module.exports = {
	queryBuilder
}