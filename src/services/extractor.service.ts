import { Extractor } from "../interfaces/extractor.interface";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

class ExtractorV1 implements Extractor {

    constructor(readonly response: Response) { }

    async extract() {
        const text = await this.response.text();
        const window = new JSDOM(text, { url: this.response.url }).window;
        const document = window.document

        const url = new URL(this.response.url);
        const h1 = document.querySelector("h1")
            ?.textContent ?? "";
        const h6 = document.querySelector("h6")
            ?.textContent ?? "";
        const title = document.querySelector(`meta[name="title"]`)
            ?.getAttribute("content") ?? "";
        const descripton = document.querySelector(`meta[name="description"]`)
            ?.getAttribute("content") ?? "";
        const links = Array.from(document.querySelectorAll("a"))
            .map(a => a.href)
            .filter(Boolean)
            .map(h => new URL(h))
            .filter(u => u.href !== url.href && !u.hash);
        const sanitazer = DOMPurify(window as unknown as Window);
        return {
            url,
            h1: sanitazer.sanitize(h1),
            h6: sanitazer.sanitize(h6),
            title: sanitazer.sanitize(title),
            descripton: sanitazer.sanitize(descripton),
            links,
        }

    }
}

export { ExtractorV1 }