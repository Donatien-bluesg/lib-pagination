import { Controller, Get } from "@nestjs/common";
import { Query } from "../../src/query";
import { GetDefaultQuery } from "../../src/decorator/get-default-query.decorator";
import { ApiPaginationQuery } from "../../src/decorator/api-pagination-query.decorator";
import { SortOrder } from "../../src/sort-order";
import { PaginationApiResponseDto } from "../../src/api/response/pagination.api-response.dto";
import { Page } from "../../src/page";
import { ApiResponse } from "@nestjs/swagger";

const testDefaultPagination = {
    pageSize: 5,
    sortBy: "testField",
    sortOrder: SortOrder.DESC,
};

@Controller()
export class TestController {
    @Get()
    @ApiPaginationQuery(testDefaultPagination)
    @ApiResponse({ type: PaginationApiResponseDto })
    test(
        @GetDefaultQuery(testDefaultPagination)
        query: Query
    ): PaginationApiResponseDto {
        return PaginationApiResponseDto.from(new Page([], query.pagination, 0));
    }
}
