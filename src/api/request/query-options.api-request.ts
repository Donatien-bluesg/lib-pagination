import { SortOrder } from "../../sort-order";

export interface QueryOptionsApiRequest {
    sortBy: string;
    sortOrder: SortOrder;
    page: number;
    pageSize: number;
}
