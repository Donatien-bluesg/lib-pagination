import { PaginationQuery } from "./pagination-query";

export class Page<T> {
    constructor(
        readonly result: T[],
        readonly pagination: PaginationQuery,
        readonly totalCount?: number,
    ) {}

    map<Other>(convert: (item: T) => Other): Page<Other> {
        return new Page(this.result.map(convert), this.pagination, this.totalCount);
    }
}
