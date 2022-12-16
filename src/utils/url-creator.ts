class URLCreator {
    constructor(private url: string) { }

    isRelative() {
        if (this.url.indexOf('://') > 0 || this.url.indexOf('//') === 0) {
            return false;
        }
        return true;
    }

    create(base?: string) {
        if (base) {
            return new URL(this.url, base);

        }
        return new URL(this.url);
    }

}

export { URLCreator }