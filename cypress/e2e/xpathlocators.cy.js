describe('XPath Locators', () => {
    it('Validate page and login', () => {
        // Navigate to the specified url and validate page title
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.title().should('eq','OrangeHRM');
        // Read Username from the login page and insert it in the input field
        cy.xpath("//p[contains(normalize-space(.), 'Username')]").then(($txt) => {
            let username = $txt.text();
            let username_array = username.split (':');
            username = username_array[1];
            username = username.trim();
            cy.xpath("//input[@placeholder='Username']").type(username);
            cy.xpath("//input[@placeholder='Username']").should('have.value', username);
        })
        // Read Password from the login page and insert it in the input field
        cy.xpath("//p[contains(normalize-space(.), 'Password')]").then(($txt) => {
            let password = $txt.text();
            let password_array = password.split (':');
            password = password_array[1];
            password = password.trim();
            cy.xpath("//input[@placeholder='Password']").type(password);
            cy.xpath("//input[@placeholder='Password']").should('have.value', password);
        })
        // Click on Login
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
    })
})