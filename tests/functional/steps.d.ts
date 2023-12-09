/// <reference types='codeceptjs' />
type steps_file = typeof import('./I.js');
type LoginPage = typeof import('./login/LoginPage.js');
type CookieHelper = import('./CookieHelper.js');

declare namespace CodeceptJS {
    interface SupportObject { I: I, current: any, LoginPage: LoginPage }
    interface Methods extends Playwright, REST, JSONResponse, CookieHelper {}
    interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
    namespace Translation {
        interface Actions {}
    }
}
