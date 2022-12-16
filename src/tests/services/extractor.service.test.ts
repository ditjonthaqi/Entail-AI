import { ExtractorV1 } from "../../services/extractor.service";


beforeEach(() => {
    jest.resetAllMocks();
});

describe("ExtactorV1", () => {
    let html = `
    <!DOCTYPE html>
    <head>  
        <meta name="title" content="The Title" >
        <meta name="description" content="The Description" >
    </head>
    <html>
        <body>
            <h1>My First Heading 1</h1>
            <h6>My First Heading 6</h6>
            <p>My first paragraph.</p>

            <a href="/path1" >link 1</a>
            <a href="http://localhost/path2" >link 1</a>
        </body>
    </html>
    `;

    const url = new URL("http://locahost:3000")
    let response = new Response(html);
    const extractor = new ExtractorV1(response);
    
    jest.spyOn(response, "url", "get").mockImplementation(() => {
        return url.href;
    });

    test("defines response", () => {
        expect(extractor.response).toEqual(response);
    });

    describe("extract()", () => {
        const page = extractor.extract();
        test("returned Page object defines h1 property", async () => {
            expect((await page).h1).toBeDefined();
        });

        test("returned Page object defines h6 property", async () => {
            expect((await page).h6).toBeDefined();
        });

        test("returned Page object defines title property", async () => {
            expect((await page).title).toBeDefined();
        });

        test("returned Page object defines description property", async () => {
            expect((await page).descripton).toBeDefined();
        });
        test("returned Page object defines url property", async () => {
            expect((await page).url).toBeInstanceOf(URL);
        });

        test("returned Page object defines url property", async () => {
            (await page).links.forEach(l => {
                expect(l).toBeInstanceOf(URL)
            });
        });
    });
});