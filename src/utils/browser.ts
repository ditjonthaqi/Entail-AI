import puppeteer from "puppeteer";

const Browser = (async () => {
    return await puppeteer.launch({
        ignoreHTTPSErrors: true
    });
})();

export default Browser;