import { CrawError } from "../../utils/craw-error";
import { EasyFetch } from "../../utils/easy-fetch";
afterEach(() => {
    jest.resetAllMocks();
});

describe("EasyFetch", () => {
    const request = new Request("http://localhost:3000");
    const easyfetch = new EasyFetch(request);

    test("defines request", () => {
        expect(easyfetch.request).toEqual(request)
    });

    describe("fetch()", () => {
        test("returns a response given a html response", async () => {
            const response = new Response("hello world", {
                headers: {
                    "content-type": "text/html",
                }
            });
            jest.spyOn(global, "fetch").mockImplementation(async () => {
                return response;
            });
            const res = await easyfetch.fetch();
            expect(res).toEqual(response);
        });

        test("throws CrawError(Response not Ok) given a status not 200 response", async () => {
            const response = new Response("hello world", {
                status: 400,
            });
            jest.spyOn(global, "fetch").mockImplementation(async () => {
                return response;
            });
            try {
                await easyfetch.fetch();
            } catch (error) {
                expect(error).toBeInstanceOf(CrawError);
                expect((<CrawError>error).message).toEqual("Response not OK");
            }
        });

        test("throws CrawError(Response not HTML) given a content-type not html header response", async () => {
            const response = new Response("hello world", {
                headers: {
                    "content-type": "application/json",
                }
            });
            jest.spyOn(global, "fetch").mockImplementation(async () => {
                return response;
            });
            try {
                await easyfetch.fetch();
            } catch (error) {
                expect(error).toBeInstanceOf(CrawError);
                expect((<CrawError>error).message).toEqual("Response not HTML");
            }
        });
    });
});