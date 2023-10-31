import { getEnv, getEnvNumber } from "../util/env.util";
import { SortOrder } from "../sort-order";
import { QueryOptionsApiRequest } from "../api/request/query-options.api-request";

export const paginationDefaultValues: QueryOptionsApiRequest = {
    sortBy: getEnv("PAGINATION_DEFAULT_SORT_BY", { default: "createdAt" }),
    sortOrder: getEnv("PAGINATION_DEFAULT_SORT_ORDER", {
        default: "DESC",
    }) as SortOrder,
    page: getEnvNumber("PAGINATION_DEFAULT_PAGE", { default: 1 }),
    pageSize: getEnvNumber("PAGINATION_DEFAULT_PAGE_SIZE", { default: 20 }),
};
