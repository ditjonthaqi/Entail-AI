import { Crawler } from "../interfaces/crawler.interface";
import { Extractor } from "../interfaces/extractor.interface";
import { Spider } from "../interfaces/spider.interface";
import { Page } from "../interfaces/page.interface";

class SpiderV1 implements Spider {
    private _depth = 1;
    private _paralel = false;
    constructor(
        readonly request: Request,
        readonly crawlerCreator: new (
            req: Request,
            extactorCreator: new (res: Response) => Extractor
        ) => Crawler,
        readonly extactorCreator: new (res: Response) => Extractor
    ) {
    }

    set paralel(paralel: boolean) {
        this._paralel = paralel;
    }


    set depth(depth: number) {
        this._depth = depth;
    }

    async web() {
        const entryPage = await this.visit(this.request);
        const visited: Page[] = [entryPage];
        let temp: Page[] = visited;
        this._depth--;

        while (this._depth > 0) {
            const pages = await this.visitLevel(temp);
            visited.push(...pages);
            temp = visited.slice(pages.length - 1);
            this._depth--;
        }

        return visited;
    }

    private async visitLevel(page: Page[]) {
        const links = page.map(p => {
            return p.links;
        }).filter(Boolean).flat();
        if (this._paralel) {
            return Promise.all(links.map(l => this.visit(new Request(l!))));
        }
        let result: Page[] = [];
        for (let l of links) {
            result.push(await this.visit(new Request(l!)));
        }
        return result;
    }

    private async visit(request: Request) {
        return await new (this.crawlerCreator)(request, this.extactorCreator).craw()
    }

}

export { SpiderV1 }