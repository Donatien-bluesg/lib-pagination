import { QueryOptionsApiRequest } from "../api/request/query-options.api-request";
import { paginationDefaultValues } from "../config/default.config";
import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { SortOrder } from "../sort-order";

export function ApiPaginationQuery(
    defaultValues: Partial<QueryOptionsApiRequest> = paginationDefaultValues
): MethodDecorator {
    return applyDecorators(
        ApiQuery({
            name: "page",
            description: `The page number requested. Min value: 1. Default is ${defaultValues.page}`,
            required: false,
            type: Number,
            example: 3,
        }),
        ApiQuery({
            name: "pageSize",
            description: `The number of item contain in every pages. Min value: 1. Default is ${defaultValues.pageSize}`,
            required: false,
            type: Number,
            example: 20,
        }),
        ApiQuery({
            name: "sortBy",
            description: `The column used to sort the items. Default is ${defaultValues.sortBy}`,
            required: false,
            type: String,
            example: "firstName",
        }),
        ApiQuery({
            name: "sortOrder",
            description: `The sens used to sort the items. Default is ${defaultValues.sortOrder}`,
            required: false,
            enum: SortOrder,
            example: "ASC",
        })
    );
}
