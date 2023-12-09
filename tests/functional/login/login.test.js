const {LoginPage} = inject();

Feature('Login');

Scenario('Accept cookies', ({I}) => {
    LoginPage.visit();

    I.doSomethingTest();
    I.click('Got it');
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
