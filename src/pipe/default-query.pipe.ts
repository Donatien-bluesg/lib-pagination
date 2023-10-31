import { paginationDefaultValues } from "../config/default.config";
import { QueryOptionsApiRequest } from "../api/request/query-options.api-request";
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { PaginationQuery } from "../pagination-query";
import { Query } from "../query";

export class DefaultQueryPipe
    implements PipeTransform<Partial<QueryOptionsApiRequest>, Query>
{
    constructor(private readonly options: Partial<QueryOptionsApiRequest>) {}

    transform(
        value: QueryOptionsApiRequest,
        metadata: ArgumentMetadata
    ): Query {
        if (metadata.type !== "query")
            throw new Error(
                "DefaultRequestQueryPipe pipe can be used only on query"
            );
        if (metadata.metatype instanceof Query)
            throw new Error(
                "DefaultRequestQueryPipe can be used only on the class Query"
            );

        this.replaceIfEmpty(value, "sortBy", paginationDefaultValues.sortBy);
        this.replaceIfEmpty(
            value,
            "sortOrder",
            paginationDefaultValues.sortOrder
        );
        this.replaceIfEmpty(value, "page", paginationDefaultValues.page);
        this.replaceIfEmpty(
            value,
            "pageSize",
            paginationDefaultValues.pageSize
        );

        return new Query(
            new PaginationQuery(
                value.page,
                value.pageSize,
                value.sortBy,
                value.sortOrder
            )
        );
    }

    private replaceIfEmpty<T>(
        value: Partial<QueryOptionsApiRequest>,
        key: string,
        defaultValue: T
    ): void {
        value[key] = value[key] || this.options[key] || defaultValue;
    }
}
