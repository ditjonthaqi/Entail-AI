import exp from "constants";
import { Page } from "../../interfaces/page.interface";
import { PageV1 } from "../../models/page.model";
import { CrawlerV1 } from "../../services/crawler.service";
import { ExtractorV1 } from "../../services/extractor.service";


beforeEach(() => {
    jest.restoreAllMocks();
});

describe("CrawlerV1", () => {
    let h1 = "My First Heading 1";
    let h6 = "My First Heading 6";
    let title = "The Title";
    let descripton = "The Description";
    let links = [
        new URL("/path1", "http://locahost/"),
        new URL("http://localhost/path2")
    ];
    let html = `
    <!DOCTYPE html>
    <head>  
        <meta name="title" content="${title}" >
        <meta name="description" content="${descripton}" >
    </head>
    <html>
        <body>
            <h1>${h1}</h1>
            <h6>${h6}</h6>
            <p>My first paragraph.</p>

            <a href="${links[0].href}" >link 1</a>
            <a href="${links[1].href}" >link 1</a>
        </body>
    </html>
    `;

    const url = new URL("http://localhost/");
    const response = new Response(html, {
        headers: {
            "content-type": "text/html"
        }
    });

    const request = new Request(url);

    test("defines request and extractorCreator", () => {
        const craler = new CrawlerV1(request, ExtractorV1);
        expect(craler.request).toEqual(request);
        expect(craler.extractorCreator).toEqual(ExtractorV1)
    });

    describe("craw()", () => {

        test("should return a Page object", async () => {
            jest.spyOn(response, "url", "get").mockImplementation(() => url.href);
            jest.spyOn(global, "fetch").mockImplementation(async () => response);
            const page: PageV1 = {
                h1,
                h6,
                title,
                descripton,
                links,
                url
            }
            const craler = new CrawlerV1(request, ExtractorV1);
            const result = await craler.craw();
            expect(result).toEqual(page);
        });
    });
});