import { SortOrder } from "./sort-order";

export class PaginationQuery {
    constructor(
        readonly page: number,
        readonly pageSize: number,
        readonly sortBy: string,
        readonly sortOrder: SortOrder,
    ) {}
}
