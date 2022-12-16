import { Page } from "./page.interface";

interface Extractor {
    readonly response: Response;
    extract(): Promise<Page>;
}

export { Extractor }