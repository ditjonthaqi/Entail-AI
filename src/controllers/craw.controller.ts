import { RequestHandler, Request } from "express";
import { CrawType } from "../dtos/craw.dto";
import { PageV1Model } from "../models/page.model";
import { CrawlerV1 } from "../services/crawler.service";
import { ExtractorV1 } from "../services/extractor.service";
import { SpiderV1 } from "../services/spider.service";

interface CrawRequest extends Request {
    craw: CrawType,
}
const crawController: RequestHandler = async (
    req,
    res,
    next
) => {
    const request = <CrawRequest>req;
    const spider = new SpiderV1(new Request(request.craw.url), CrawlerV1, ExtractorV1);
    spider.paralel = true;
    if (request.craw.depth) {
        spider.depth = request.craw.depth;
    }
    const pages = await spider.web();
    await PageV1Model.insertMany(pages);
    res.json(pages);
}

export { crawController }