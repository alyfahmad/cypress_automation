describe('verify create new employee and login info', () => {
    it('verify login and add new employee', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
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
        // Click on Login and validate
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.title().should('eq','OrangeHRM');
        cy.xpath("//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]").should('be.visible');
        cy.xpath("//a/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]").click();
        cy.xpath("//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'pim')]").should('be.visible');
        cy.xpath("//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'add')]").click();
        cy.xpath("//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'add employee')]").should('be.visible');
        // Add employee information
        cy.xpath("//input[@placeholder='First Name']").type('tester f_name');
        cy.xpath("//input[@placeholder='Middle Name']").type('tester m_name');
        cy.xpath("//input[@placeholder='Last Name']").type('tester l_name');
        cy.xpath("//input[@type='file']").selectFile('./cypress/robot.jpg', {force: true});
        cy.xpath("//input[@type='checkbox']").check({force: true});
        cy.xpath("//label[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'username')]/parent::div/parent::div//input").type('tester');
        cy.xpath("//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='password']/parent::div/parent::div//input").type('sample_password');
        cy.xpath("//label[normalize-space(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))='confirm password']/parent::div/parent::div//input").type('sample_password');
        cy.xpath("//button[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'save')]").click();
    })
})