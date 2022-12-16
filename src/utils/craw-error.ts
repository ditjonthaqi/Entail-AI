type CrawErrorType = "Response not OK" | "Response not HTML" | "Network Error";

class CrawError extends Error {
    constructor(readonly message: CrawErrorType) {
        super(message);
    }
}

export { CrawError, CrawErrorType}