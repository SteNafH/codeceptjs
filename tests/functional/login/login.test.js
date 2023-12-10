const {LoginPage} = inject();

Feature('Login');

Scenario('Accept cookies', ({I}) => {
    LoginPage.visit();

    I.dontSee('This website uses cookies to ensure you get the best experience on our website.');
});

Scenario('Successful Login', ({I}) => {
    LoginPage.visit();

    LoginPage.fillUsername('stefan');
    LoginPage.fillPassword('test');
    LoginPage.login();

    I.see('Successful Login!');
});

Scenario('Failed Login', async ({I}) => {
    LoginPage.visit();

    LoginPage.fillUsername('incorrect_username');
    LoginPage.fillPassword('incorrect_username');
    LoginPage.login();

    I.see('Incorrect Login!');
});
