import { Controller, Get } from "@nestjs/common";
import { Query } from "../../src/query";
import { GetDefaultQuery } from "../../src/decorator/get-default-query.decorator";
import { ApiPaginationQuery } from "../../src/decorator/api-pagination-query.decorator";
import { SortOrder } from "../../src/sort-order";

const testDefaultPagination = {
    pageSize: 5,
    sortBy: "testField",
    sortOrder: SortOrder.DESC,
};

@Controller()
export class TestController {
    @Get()
    @ApiPaginationQuery(testDefaultPagination)
    test(
        @GetDefaultQuery(testDefaultPagination)
        query: Query
    ): Query {
        return query;
    }
}
