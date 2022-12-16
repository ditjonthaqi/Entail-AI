import { model, Schema } from "mongoose";
import { Page } from "../interfaces/page.interface";

interface PageV1 extends Page {
    h1: string;
    h6: string;
    title: string;
    descripton: string;
}

const pageV1Schema = new Schema<PageV1>({
    descripton: { type: String },
    failedReason: { type: String },
    h1: { type: String },
    h6: { type: String },
    links: { type: [String] },
    title: { type: String },
    url: { type: String },
});

const PageV1Model = model<PageV1>("page", pageV1Schema);

export { PageV1, PageV1Model }