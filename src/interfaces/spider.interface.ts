import { Crawler } from "./crawler.interface";
import { Extractor } from "./extractor.interface";
import { Page } from "./page.interface";

interface Spider {
    readonly crawlerCreator: new (
        req: Request,
        extactorCreator: new (res: Response) => Extractor
    ) => Crawler
    readonly extactorCreator: new(res: Response) => Extractor;
    readonly request: Request;
    depth: number;
    web(): Promise<Page[]>;
}

export { Spider }