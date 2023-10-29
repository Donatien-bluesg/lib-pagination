import { Page } from "../../src/page";
import { PaginationQuery } from "../../src/pagination-query";
import { SortOrder } from "../../src/sort-order";

describe("Page.map", () => {
    class A {
        constructor(public value: string) {}
    }

    class B {
        constructor(public text: string) {}
    }

    it("should return a page of result mapped correctly", () => {
        const values = [new A("test 01"), new A("test 02")];
        const page = new Page(
            values,
            new PaginationQuery(1, 10, "value", SortOrder.ASC),
            2
        );
        expect(page.map((item) => new B(item.value))).toStrictEqual(
            new Page(
                [new B("test 01"), new B("test 02")],
                new PaginationQuery(1, 10, "value", SortOrder.ASC),
                2
            )
        );
    });
});
