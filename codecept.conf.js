const { setHeadlessWhen } = require("@codeceptjs/configure");

setHeadlessWhen(process.env.HEADLESS);

const url = process.env.BASE_URL || "http://localhost:42069";

exports.config = {
    tests: "./tests/functional/**/*.test.js",
    output: "./tests/functional/_output",
    helpers: {
        Playwright: {
            show: process.env.HEADLESS !== "true",
            restart: false,
            keepCookies: true,
            url: url,
            windowSize: "1400x800",
            browser: "chromium",
            video: false,
            trace: false,
            fullPageScreenshots: true,
        },
        REST: {
            endpoint: url,
        },
        JSONResponse: {},
        CookieHelper: {
            require: './tests/functional/CookieHelper.js',
            defaultCookies: [{name: 'cookie', value: 'name', url: url}]
        }
    },
    include: {
        I: "./tests/functional/I.js",
        LoginPage: "./tests/functional/login/LoginPage.js",
    },
    bootstrap: null,
    name: "app",
    plugins: {
        pauseOnFail: {},
        retryFailedStep: {
            enabled: true,
        },
        tryTo: {
            enabled: true,
        },
        screenshotOnFail: {
            enabled: true,
        }
    },
};
