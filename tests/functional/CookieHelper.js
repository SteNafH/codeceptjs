const {Helper} = require('codeceptjs');
const setCookie = require('set-cookie-parser');

class CookieHelper extends Helper {
    async _handleDefaultCookies() {
        if (!this.config.defaultCookies?.length) {
            return;
        }

        const {browserContext} = this.helpers.Playwright;
        await browserContext.addCookies(this.config.defaultCookies);
    }

    _handleSecureCookies() {
        if (!this.config.alwaysSetCookies) {
            return;
        }

        const {browserContext, page} = this.helpers.Playwright;

        page.on('response', async (response) => {
            const newCookiesString = await response.headerValue('Set-Cookie');
            await response.finished();

            if (!newCookiesString) {
                return;
            }

            const newCookies = setCookie.parse(newCookiesString);

            if (!newCookies.length) {
                return;
            }

            const requestHeaders = await response.request().allHeaders();
            const requestUrl = new URL(requestHeaders.referer);

            for (const cookie of newCookies) {
                cookie.expires = Math.floor(cookie.expires.getTime() / 1000);

                if (!cookie.url && (!cookie.domain && !cookie.path)) {
                    cookie.domain = requestUrl.hostname;
                    cookie.path = requestUrl.pathname;
                }
            }

            await browserContext.addCookies(newCookies);
        });
    }

    async _before() {
        await this._handleDefaultCookies();
        this._handleSecureCookies();
    }
}

module.exports = CookieHelper;
