import { RequestHandler, Request } from "express";
import { History, HistoryType } from "../dtos/history.dto";

const historyValidator: RequestHandler = (
    req: Request & { history?: HistoryType },
    res,
    next
) => {
    const result = History.safeParse(req.query);
    if (result.success) {
        req.history = {
            url: result.data.url,
            depth: result.data.depth >= 1 ? result.data.depth : 1,
        }
        return next();
    }
    res.status(400).json({ message: "Bad Request" });
};

export { historyValidator }