import { CrawlerV1 } from "../../services/crawler.service";
import { ExtractorV1 } from "../../services/extractor.service";
import { SpiderV1 } from "../../services/spider.service";
import { FetchProxy } from "../../services/fetch-proxy.service";


let i = -1;

let title = "The Title";
let description = "The Description";
const req = new Request("http:/localhost/1");


let urls = [
    "http://localhost/1",
    "http://localhost/2",
    "http://localhost/3",
    "http://localhost/4",
    "http://localhost/5",
    "http://localhost/6",
    "http://localhost/7",
];

beforeEach(() => {
    i = -1;
    jest.resetAllMocks();
});


describe("SpiderV1", () => {

    const spider = new SpiderV1(req, CrawlerV1, ExtractorV1);

    const html = `
        <!DOCTYPE html>
        <html>
        <head>  
            <meta name="title" content="${title}" >
            <meta name="description" content="${description}" >
        </head>
        <body>
            <h1>h1</h1>
            <h6>h6</h2>
            <a href="/${i}">go to Example 1</a>
            <a href="${i++}">go to Example 2</a
            <p>My first paragraph.</p>
        </body>
        </html>n
    `;
    test("defines request", () => {

    });

    test("crawlerCreator", () => {

    });

    test("extractorCreator", () => {

    });

    describe("web()", () => {


        spider.depth = 3;



        test("should return array of Pages", async () => {
            jest.spyOn(global, "fetch").mockImplementation(async () => {
                i++;
                return new Proxy(new Response(html, {
                    headers: {
                        "content-type": "text/html",
                    }
                }), {
                    get(target, key) {
                        if (key === "url") {

                            return urls[i];
                        }
                        return Reflect.get(target, key);
                    }
                });
            });
            let pages = await spider.web();
            expect(pages.length).toBe(7);
            for (let p of pages) {
                expect(urls.indexOf(p.url.href)).toBeGreaterThan(-1)
            }
        });

    });
});