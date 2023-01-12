class QueryBuilder {
	constructor(params) {
		this.sortBy = queryParams.sortBy || `price_high`;
		this.limit = queryParams.limit || 6;
		this.offset = queryParams.offset || 0;
	}
}