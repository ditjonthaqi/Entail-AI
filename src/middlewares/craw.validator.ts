import { RequestHandler, Request } from "express";
import { Craw, CrawType } from "../dtos/craw.dto";

const crawValidator: RequestHandler = (
    req: Request & { craw?: CrawType },
    res,
    next
) => {
    const result = Craw.safeParse(req.query);
    if (result.success) {
    
        req.craw = {
            url: result.data.url,
            depth: result.data.depth >= 1 ? result.data.depth : 1,
        }
        return next();
    }
    res.status(400).json({ message: "Bad Request" });
};

export { crawValidator }