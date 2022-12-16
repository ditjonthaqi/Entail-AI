import { URLCreator } from "../../utils/url-creator";

describe("URLCreator", () => {
    describe("isRelative()", () => {
        test("returns true given realtive url", () => {
            const url = "/path";
            const creator = new URLCreator(url);
            const result = creator.isRelative();
            expect(result).toBe(true);
        });

        test("return false given absoulte url", () => {
            const url = "http://localhost/";
            const creator = new URLCreator(url);
            const result = creator.isRelative();
            expect(result).toBe(false);
        });
    });

    describe("create()", () => {
        test("returns a new instace of URL given a absoulte url ", () => {
            const url = "http://localhost/";
            const creator = new URLCreator(url);
            const result = creator.create();
            expect(result).toEqual(new URL(url));
        });

        test("returns a new instance of URL given a relative url if base is provided", () => {
            const base = "http://localhost/";
            const path = "/path";
            const creator = new URLCreator(path);
            const result = creator.create(base);
            expect(result).toEqual(new URL(path, base));
        });
    });
});