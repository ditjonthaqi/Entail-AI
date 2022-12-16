import { z } from "zod";

const History = z.object({
    url: z.string().url(),
    depth: z.string().transform(Number)
});

type HistoryType = z.infer<typeof History>;

export { History, HistoryType }