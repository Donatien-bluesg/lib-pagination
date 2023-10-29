import { SortOrder } from "../../sort-order";
import { PaginationQuery } from "../../pagination-query";

export class PaginationApiResponseDto {
    page: number;
    pageSize: number;
    sortBy: string;
    sortOrder: SortOrder;

    from(pagination: PaginationQuery): PaginationApiResponseDto {
        const dto = new PaginationApiResponseDto();

        dto.page = pagination.page;
        dto.pageSize = pagination.pageSize;
        dto.sortBy = pagination.sortBy;
        dto.sortOrder = pagination.sortOrder;

        return dto;
    }
}
