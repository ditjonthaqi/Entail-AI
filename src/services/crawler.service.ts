import { Crawler } from "../interfaces/crawler.interface";
import { Extractor } from "../interfaces/extractor.interface";
import { Page } from "../interfaces/page.interface";
import { CrawError } from "../utils/craw-error";
import { EasyFetch } from "../utils/easy-fetch";

class CrawlerV1 implements Crawler {
    private fetcher: EasyFetch;
    constructor(
        readonly request: Request,
        readonly extractorCreator: new (res: Response) => Extractor
    ) {
        this.fetcher = new EasyFetch(this.request);
    }

    async craw() {
        let response: Response;
        let failedReason: string = "";
        let page: Page;
        try {
            response = await this.fetcher.fetch();
            page = await (new this.extractorCreator(response)).extract()
        } catch (error) {
            failedReason = (<CrawError>error).message
        }
        if (failedReason) {
            return {
                url: new URL(this.request.url),
                failedReason,
            }
        }
        return page!;
    }
}

export { CrawlerV1 }