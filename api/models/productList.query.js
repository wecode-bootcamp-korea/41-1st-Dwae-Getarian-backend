const SORT_MAPPER = Object.freeze({
	new: `created_at DESC `,
	old: `created_at ASC `,
	price_high: `price DESC `,
	price_low: `price ASC `,
	best: `sub.totalPurchased DESC `
});

const WHERE_MAPPER = {
	categoryId: categoryFilterBuilder,
	// search: searchFilterBuilder,
	// isMealkit: mealFilterBuilder
}

function categoryFilterBuilder(categoryId) {
	return `p.category_id IN (${categoryId})}`; 
}

// function searchFilterBuilder(keyWord) {
// 	if (!keyWord) return "";
// }

// function mealFilterBuilder(value) {
// 	if (!value) return "";
// }

class QueryBuilder {
	constructor(categoryId, sortBy, limit, offset) {
		this.sortBy = sortBy || `price_high`;
		this.limit = limit || 6;
		this.offset = offset || 0;
		this.whereParams = {
			// ...(searchKeyword && { searchKeyword }),
			...(categoryId && { categoryId }),
		}
	}
	

	createOrderClause() { 
		if (Array.isArray(this.sortBy)) {
			const orderClause = this.sortBy.map((option) => SORT_MAPPER[option]
		);

			return `ORDER BY ${orderClause.join("")}`;
		}
		else return `ORDER BY ${SORT_MAPPER[this.sortBy]}`
	}

	createWhereClause() {
		console.log(this.whereParams)
		const whereConditions = Object.entries(this.whereParams).map(([ key, value ]) => {
			return WHERE_MAPPER[key](value)});
	
		console.log(whereConditions)

		return whereConditions.length !== 0 ? `WHERE ${whereConditions.join(' AND ')}` : ""
	}

	createLimitClause() {

		return `LIMIT ${Number(this.limit)} OFFSET ${Number(this.offset)}`;
	}

	buildQuery() {
		console.log(this.createWhereClause())
		const result = `${this.createWhereClause()} + ${this.createOrderClause()} +${this.createLimitClause()}`
		console.log(result);
		return result
	}
}

module.exports = QueryBuilder;

// if (Array.isArray(this.whereParams)) {
// 	const whereClause = this.categoryId.map(([option]) => `categories.id = ${option}`);
// 	return `WHERE ${whereClause.join(` OR `)}`;
// }
// else if (this.categoryId) return `WHERE categories.id = ${this.categoryId}`;
// else return ``;