# Pagination
This library provides a standard implementation of pagination queries and results, to be used in any services through our platform.

## Configuration
### Default Pagination Values
It is possible to define the default value used for the pagination of a service by using environment values:
```dotenv
PAGINATION_DEFAULT_PAGE=1
PAGINATION_DEFAULT_PAGE_SIZE=20
PAGINATION_DEFAULT_SORT_BY=createdAt
PAGINATION_DEFAULT_SORT_ORDER=DESC # Accept: ASC, DESC
```

## General usage
When a service is processing data using pagination, the input needs to contain the pagination data and the output need to provide the pagination information, so it can be used to request maybe other pages of data.

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/149f4055-da7a-4878-acb0-fc7c216c7056)

```ts
import {PaginationQuery} from "./pagination-query";

class MyQuery extends Query {
    constructor(readonly search: string, pagination: PaginationQuery) {
        super(pagination);
    }
}
```

## When querying a DB

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/241a5405-d0b8-493e-bc20-4c29c48c57ca)

#### Queries can be used in Repositories:
```ts
class MyRepo {
    // Using Query Builder
    async findSome(query: MyQuery): Promise<Page<MyEntity>> {
        const [entities, count] = await this.createQueryBuilder('a')
            .where(
                'a.id::text ILIKE :search OR a.label ILIKE :search',
                { search: `%${query.search}%` }
            )
            .skip(query.skip())
            .take(query.pageSize)
            .orderBy(query.orderBy({ alias: 'a' }), query.sortOrder)
            .getManyAndCount();
        
        return new Page(entities, query.pagination, count);
    }
    
    // Using Find options
    async findOthers(query: MyQuery): Promise<Page<MyEntity>> {
        const [entities, count] = this.findAndCount({
            where: { id: Ilike(`%${query.search}%`) },
            ...query.toDbOptions()
        })
        
        return new Page(entities, query.pagination, count);
    }
}
```

#### Queries can be used in Service:

```ts
class MyService {
    constructor(private repo: MyRepo) {}

    // From another page with different content
    async getSome(query: MyQuery): Promise<Page<MyObject>> {
        const entities: Page<MyEntity> = await this.repo.findSome(query)

        return entities.map(e => e.toMyObject())
    }
}
```

#### Queries and Pagination used in Controller
```ts
@Controller()
export class MyController {
    @Get()
    // create pagination in swagger for this API
    @ApiPaginationQuery(testDefaultPagination) 
    @ApiResponse({ type: PaginationApiResponseDto })
    test(
        // extract the pagination query params, 
        // replace missing values with default 
        // and insert them into a Query object
        @GetDefaultQuery(testDefaultPagination)
            query: Query
    ): PaginationApiResponseDto {
        // This DTO is to be used in the service API Responses, 
        // as { pagination: PaginationApiResponseDto }
        return PaginationApiResponseDto.from(new Page([], query.pagination, 0));
    }
}
```

## When calling an external API using pagination
External APIs can be using pagination, but with different wording.

Pagination should be converted into the correct pagination DTO, maybe by extending the Pagination Query.

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/cc652e14-61a3-45b4-9972-a55b0a1e8321)

## Map Pagination?
Usually pagination is used on big lists. But we can imagine we need to split a very big map of data.

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/da29b4f7-6a51-4b91-8fa2-a095ccb3fc0a)

One first solution is using pages of [Key, Value].
Another possibility would be to have a `Shard<T>` that would be a part of a map, eventually which could be combine again into the full map.

# Contributing to the Project

## Installation
```bash
yarn install
```

## Run the Test app
To display the example of swagger it is possible to start the test application with the command
```bash
yarn start:test-app
```
