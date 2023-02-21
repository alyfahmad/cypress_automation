class Login
{
    usernamelocator = "//input[@placeholder='Username']";
    passwordlocator = "//input[@placeholder='Password']";
    getusernamelocator = "//p[contains(normalize-space(.), 'Username')]";
    getpasswordlocator = "//p[contains(normalize-space(.), 'Password')]";

    navigateToURLandVeifyTitle(url, title){
        cy.visit(url);
        cy.title().should("eq", title);
    }
    setUserName(username) {
        cy.xpath(this.usernamelocator).type(username);
    }

    clearUserName() {
        cy.xpath(this.usernamelocator).clear();
    }

    setPassword(password) {
        cy.xpath(this.passwordlocator).type(password);
    }

    clearPassword() {
        cy.xpath(this.passwordlocator).clear();
    }

    fetchUsernameFromLoginPageSetUsername(){
        cy.xpath(this.getusernamelocator).then(($txt) => {
            let username = $txt.text();
            let username_array = username.split(":");
            username = username_array[1];
            username = username.trim();
            this.setUserName(username);
        })
    }

    validateUserName(expected_username) {
        cy.xpath(this.usernamelocator).should(
            "have.value",
            expected_username
        );
    }

    fetchPasswordFromLoginPageandSetPassword(){
        cy.xpath(this.getpasswordlocator).then(($txt) => {
            let password = $txt.text();
            let password_array = password.split(":");
            password = password_array[1];
            password = password.trim();
            this.setPassword(password);
          });
        
    }

    validatePassword(expected_password) {
        cy.xpath(this.passwordlocator).should(
            "have.value",
            expected_password
        );
    }

}

export default Login;