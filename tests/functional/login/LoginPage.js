const {I} = inject();

class LoginPage {
    visit() {
        I.amOnPage('/')
    }

    fillUsername(username) {
        I.fillField('username', username);
    }

    fillPassword(password) {
        I.fillField('password', secret(password));
    }

    login() {
        I.click('Login');
    }
}

module.exports = new LoginPage();
