class QueryBuilder {
	constructor(categoryId, sortBy, limit, offset, isMealkit) {
		this.sortBy = sortBy || `price_high`;
		this.limit = limit || 6;
		this.offset = offset || 0;

		this.whereParams = {
			...(categoryId && { categoryId }),
			...(isMealkit && { isMealkit })
		}

		this.sortMapper = {
			new: `created_at DESC `,
			old: `created_at ASC `,
			price_high: `price DESC `,
			price_low: `price ASC `,
			best: `sub.totalPurchased DESC `
		};

		this.whereMapper = {
			categoryId: this.categoryFilterBuilder,
			isMealkit: this.mealFilterBuilder
		}
	}

	createOrderClause() { 
		if (Array.isArray(this.sortBy)) {
			const orderClause = this.sortBy.map((option) => this.sortMapper[option]
		);
			return `ORDER BY ${orderClause.join(",")}`;
		}
		else return `ORDER BY ${this.sortMapper[this.sortBy]}`
	}

	createWhereClause() {
		const whereConditions = Object.entries(this.whereParams).map(([ key, value ]) => {
			return this.whereMapper[key](value)});

		return whereConditions.length !== 0 ? `WHERE ${whereConditions.join(' AND ')}` : ""
	}

	createLimitClause() {
		return `LIMIT ${Number(this.limit)} OFFSET ${Number(this.offset)}`;
	}

	categoryFilterBuilder(categoryId) {
		return `categories.id IN (${categoryId})`; 
	}

	mealFilterBuilder(booleanId) {
		return `isMealkit = ${booleanId}`;
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
