import { CrawError } from "./craw-error";

class EasyFetch {
    constructor(readonly request: Request) { }

    async fetch() {
        let res: Response;
        try {
            res = await fetch(this.request);
            if (!res.ok) {
                throw new CrawError("Response not OK");
            }
            if (!this.isHTMLResponse(res)) {
                throw new CrawError("Response not HTML");
            }
        } catch (error) {
            if (!(error instanceof CrawError)) {
                error = new CrawError("Network Error");
            }
            throw error;
        }
        return res;
    }

    private isHTMLResponse(res: Response) {
        return Boolean(
            res.headers.get("Content-Type")?.includes("text/html")
        );
    }
}

export { EasyFetch }