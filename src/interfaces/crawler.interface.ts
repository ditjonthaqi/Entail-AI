
import { Extractor } from "./extractor.interface";
import { Page } from "./page.interface";

interface Crawler {
    readonly request: Request;
    readonly extractorCreator: new (response: Response) => Extractor;
    craw(): Promise<Page>;
}

export { Crawler }