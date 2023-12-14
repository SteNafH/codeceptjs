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

    _handleCookies() {
        if (!this.config.alwaysSetCookies) {
            return;
        }

        const {browserContext, page} = this.helpers.Playwright;

        page.on('response', async (response) => {
            const cookies = await response.headerValues('Set-Cookie')
                .then(setCookie.parse)
                .then(cookies => cookies.flat());
            await response.finished();

            if (!cookies.length) {
                return;
            }

            const referer = await response.request().headerValue('referer');
            const url = new URL(referer);

            for (const cookie of cookies) {
                cookie.expires = Math.floor(cookie.expires.getTime() / 1000);
                cookie.sameSite = cookie.sameSite.charAt(0).toUpperCase() + cookie.sameSite.slice(1);

                if (!cookie.url) {
                    cookie.domain ||= url.hostname;
                    cookie.path ||= url.pathname;
                }
            }

            await browserContext.addCookies(cookies);
        });
    }

    async _before() {
        await this._handleDefaultCookies();
        this._handleCookies();
    }
}

module.exports = CookieHelper;
