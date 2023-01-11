const SORT_MAPPER = Object.freeze({
	new: `created_at DESC `,
	old: `created_at ASC `,
	price_high: `price DESC `,
	price_low: `price ASC `,
	best: `sub.totalPurchased DESC `
});

const LIMIT_MAPPER = Object.freeze({
	list_10: `LIMIT 10 `,
	list_8: `LIMIT 8`
});

class QueryBuilder {
	constructor(queryParams) {
		this.sortBy = queryParams.sortBy || `price_high`;
		this.categoryId = queryParams.categoryId || undefined;
		this.page = queryParams.page || `list_10`;
	}

	createOrderClause() { 
		if (Array.isArray(this.sortBy)) {
			const orderClause = this.sortBy.map((option) => {
				return SORT_MAPPER[option]
			});

			return `ORDER BY ${orderClause.join(",")}`;
		}
		else return `ORDER BY ${SORT_MAPPER[this.sortBy]}`
	}

	createWhereClause() {
		if (Array.isArray(this.categoryId)) {
			const whereClause = this.categoryId.map((option) => {
				return `categories.id = ${option}`;
			});

			return `WHERE ${whereClause.join(` AND `)}`;
		}
		else if (this.categoryId) return `WHERE categories.id = ${this.categoryId}`;
		else return `WHERE TRUE`;
	}

	createLimitClause() {
		return LIMIT_MAPPER[this.page];
	}

	buildQuery() {
		return `
		${this.createWhereClause()} 
		${this.createOrderClause()}
		${this.createLimitClause()}
	`
	}
}

module.exports = QueryBuilder;