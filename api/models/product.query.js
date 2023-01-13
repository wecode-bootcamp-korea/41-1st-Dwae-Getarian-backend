const { checkSpecial } = require("../util/checkSpecial");

const orderFilter = {
	price_high: `price DESC `,
	price_low: `price ASC `,
	new: `created_at DESC `,
	old: `created_at ASC `,
	best: `sub.totalPurchased DESC `
}

const joinFilter = {
	category: `INNER JOIN categories ON products.category_id = categories.id `
}

const whereFilter = {
	category: (value) => { return `WHERE categories.id = ${value} ` },
	categories: (values) => { return `WHERE categories.id IN (${ values }) `}
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

	if (categoryId) {
		// if there exists a categoryId joinClause always exists hence it becomes created in the very beginning.
		joinClause = joinFilter["category"];

		// if we consider multiple categories in which it comes as ids in an array. we checkt whether the value assigend to a key is
		// an array then assigns its value to a query phrase for multiples categoryIds.
		if (Array.isArray(categoryId)) {
			whereClause = whereFilter["categories"](categoryId);
		}

		else {
			whereClause = whereFilter["category"](Number(categoryId)); 
		}
	}

	if (page) {
		pageClause = pageFilter[page];
	}
	
	if (sortBy) {
		// if we have more than two sortBy options is comes as an array thereby we check
		// if this is an array then construct a query such that it returns a data meeting those conditions.
		if (Array.isArray(sortBy)) {
			orderClause = `ORDER BY ${orderFilter[sortBy[0]]}, `;
			for (let i = 1; i < sortBy.length; i++) {
				orderClause += orderFilter[sortBy[i]];
			}
		}

		// else we assign a single value to a filter and it returns a order query qualitfying one condition.
		else {
			orderClause = `ORDER BY ${orderFilter[sortBy]}`;
		}
	}


	if (search && !checkSpecial(search)) {
		searchClause = searchFilter["keyword"](search);
	}

	return { joinClause, orderClause, whereClause, pageClause, searchClause };
}


module.exports = {
	queryBuilder
}