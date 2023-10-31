import { SortOrder } from "../../sort-order";
import { Page } from "../../page";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationApiResponseDto {
    @ApiProperty({
        description: "The page number of the query returned",
        example: 2,
    })
    page: number;

    @ApiProperty({
        description: "The size of the page returned",
        example: 25,
    })
    pageSize: number;

    @ApiProperty({
        description: "The field on which the result are ordered.",
        example: "createdAt",
    })
    sortBy: string;

    @ApiProperty({
        description: "The sense the result are ordered on.",
        enum: SortOrder,
        example: SortOrder.ASC,
    })
    sortOrder: SortOrder;

    @ApiProperty({
        description: "The total number of items available in the system",
        example: 1234,
    })
    total: number;

    static from(page: Page<unknown>): PaginationApiResponseDto {
        const dto = new PaginationApiResponseDto();
        const pagination = page.pagination;

        dto.page = pagination.page;
        dto.pageSize = pagination.pageSize;
        dto.sortBy = pagination.sortBy;
        dto.sortOrder = pagination.sortOrder;
        dto.total = page.totalCount;

        return dto;
    }
}
