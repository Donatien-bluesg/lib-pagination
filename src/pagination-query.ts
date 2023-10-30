import { SortOrder } from "./sort-order";

export class PaginationQuery {
    constructor(
        readonly page: number,
        readonly pageSize: number,
        readonly sortBy: string,
        readonly sortOrder: SortOrder
    ) {}

    skip(): number {
        return (this.page - 1) * this.pageSize;
    }

    orderBy(options: { alias?: string } = {}): string {
        return (options.alias ? `${options.alias}.` : "") + this.sortBy;
    }

    toDbOptions(): {
        order: { [col in string]: SortOrder };
        skip: number;
        take: number;
    } {
        return {
            skip: this.skip(),
            take: this.pageSize,
            order: this.sortBy
                ? {
                      [this.sortBy]: this.sortOrder,
                  }
                : null,
        };
    }
}
