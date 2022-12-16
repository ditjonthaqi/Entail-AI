import { CrawError, CrawErrorType } from "../../utils/craw-error";

describe("CrawError", () => {
    const errorType: CrawErrorType = "Network Error";
    const error = new CrawError(errorType);

    test("defines message", () => {
        expect(error.message).toBe(errorType);
    });

    test("extends Error", () => {
        expect(error).toBeInstanceOf(Error);
    });
});