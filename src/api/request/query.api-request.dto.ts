import { SortOrder } from "../../sort-order";
import { IsEnum, IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { Query } from "../../query";
import { PaginationQuery } from "../../pagination-query";

export class QueryApiRequestDto {
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    public readonly page: number;

    @IsInt()
    @Min(1)
    @IsOptional()
    @Type(() => Number)
    public readonly pageSize: number;

    @IsOptional()
    readonly sortBy: string;

    @IsEnum(SortOrder)
    @IsOptional()
    readonly sortOrder: SortOrder;

    constructor(
        sortBy: string,
        sortOrder: SortOrder,
        page: number,
        pageSize: number
    ) {
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
        this.page = page;
        this.pageSize = pageSize;
    }

    toQuery(): Query {
        return new Query(
            new PaginationQuery(
                this.page,
                this.pageSize,
                this.sortBy,
                this.sortOrder
            )
        );
    }
}
