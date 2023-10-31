import { QueryOptionsApiRequest } from "../api/request/query-options.api-request";
import { Query } from "@nestjs/common";
import { DefaultQueryPipe } from "../pipe/default-query.pipe";

export function GetDefaultQuery(
    defaultValues: Partial<QueryOptionsApiRequest> = {}
): ParameterDecorator {
    return Query(new DefaultQueryPipe(defaultValues));
}
