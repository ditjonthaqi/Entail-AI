import browser from "../utils/browser";

let originalFeth = fetch;
const FetchProxy: typeof fetch = async (input, init) => {
    const page = await (await browser).newPage();
    if (input instanceof URL) {
        return originalFeth(input, init);
    }
    if (typeof input == "string") {
        return originalFeth(input, init);
    }

    const res = await page.goto(input.url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*')!.outerHTML);
    const headers = res?.headers();
    const contentType = headers?.["content-type"] ?? new Error;
    if (contentType instanceof Error) {
        throw contentType;
    }
    page.close();
    return new Proxy(new Response(data, {
        headers: {
            "content-type": contentType
        }
    }), {
        get(target, key) {
            if (key === "url") {
                return page.url();
            }
            return Reflect.get(target, key);
        }
    });
}


export { FetchProxy }
