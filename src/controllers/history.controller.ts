import { RequestHandler, Request } from "express"

import { HistoryType } from "../dtos/history.dto";
import { PageV1Model } from "../models/page.model";

interface HistoryRequest extends Request {
    history: HistoryType,
}
const historyController: RequestHandler = async (
    req,
    res,
    next
) => {
    const request = <HistoryRequest>req;
    let depth = request.history.depth;
    let urls = [request.history.url];
    let result = [];
    while (depth > 0) {
        let pages = await getPages(urls);
        result.push(...pages);
        urls = pages.map(p => p.links as unknown as string[]).flat();

        depth--;
    }

    res.send(result)
}

function getPages(urls: string[]) {
    return PageV1Model.find({ url: { $in: urls } })
}

export { historyController }