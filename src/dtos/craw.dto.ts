import { z } from "zod";

const Craw = z.object({
    url: z.string().url(),
    depth: z.string().transform(Number)
});

type CrawType = z.infer<typeof Craw>;

export { Craw, CrawType }