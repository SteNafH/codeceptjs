const {Helper} = require('codeceptjs');

class CookieHelper extends Helper {
    async _before() {
        if (!this.config.defaultCookies?.length) {
            return;
        }

        const {browserContext} = this.helpers.Playwright;
        const cookies = await browserContext.cookies();

        const cookieLookup = new Map();
        for (const cookie of cookies) {
            cookieLookup.set(`${cookie.url || (cookie.domain + cookie.path)}:${cookie.name}`, cookie);
        }

        const newCookies = [];
        for (const cookie of this.config.defaultCookies) {
            if (!cookieLookup.has(`${cookie.url || (cookie.domain + cookie.path)}:${cookie.name}`)) {
                newCookies.push(cookie);
            }
        }

        if (newCookies.length) {
            await browserContext.addCookies(newCookies);
        }
    }

    doSomethingTest() {
        console.log('hoi')
    }
}

module.exports = CookieHelper;
