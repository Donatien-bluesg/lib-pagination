import { PaginationQuery } from "./pagination-query";

export class Page<T> {
    constructor(
        readonly result: T[],
        readonly pagination: PaginationQuery,
        readonly totalCount?: number,
    ) {}
}
