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

## When querying a DB

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/241a5405-d0b8-493e-bc20-4c29c48c57ca)

## When calling an external API using pagination
External APIs can be using pagination, but with different wording.

Pagination should be converted into the correct pagination DTO, maybe by extending the Pagination Query.

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/cc652e14-61a3-45b4-9972-a55b0a1e8321)

## Map Pagination?
Usually pagination is used on big lists. But we can imagine we need to split a very big map of data.

![image](https://github.com/Donatien-bluesg/lib-pagination/assets/110004541/da29b4f7-6a51-4b91-8fa2-a095ccb3fc0a)

One first solution is using pages of [Key, Value].
Another possibility would be to have a `Shard<T>` that would be a part of a map, eventually which could be combine again into the full map.

# Project Installation

```bash
yarn install
```
