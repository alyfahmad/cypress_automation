describe('Verify login page', () => {
    it('Validate login page content', () => {
        // Navigate to the specified url and validate page title
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.title().should('eq','OrangeHRM');
        cy.xpath("//div[@class='orangehrm-login-branding']").should('be.visible');
        cy.xpath("//h5[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'login')]").should('be.visible');
        cy.xpath("//div[@class='orangehrm-login-logo']").should('be.visible');
        cy.xpath("//p[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'orangehrm os')]").should('be.visible');
        cy.xpath("//p/a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'orangehrm, inc')]").should('be.visible');
        //verify socials
        cy.xpath("//a[contains(@href,'linkedin')]").should('be.visible');
        cy.xpath("//a[contains(@href,'facebook')]").should('be.visible');
        cy.xpath("//a[contains(@href,'twitter')]").should('be.visible');
        cy.xpath("//a[contains(@href,'youtube')]").should('be.visible');
    })

    it('Validate user cannot login without credentials', () => {
        // Navigate to the specified url and validate page title
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.title().should('eq','OrangeHRM');
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//input[@placeholder='Username']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Password']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
    })
    
    it('Validate user cannot login with wrong credentials', () => {
        // Navigate to the specified url and validate page title
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.title().should('eq','OrangeHRM');
        cy.xpath("//input[@placeholder='Username']").type('tester');
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//input[@placeholder='Password']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Username']").clear();
        cy.xpath("//input[@placeholder='Username']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Password']").type('test_password');
        cy.xpath("//input[@placeholder='Username']").type('tester');
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//p[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'invalid credentials')]").should('be.visible')
    })

    it('Validate login with valid credentials', () => {
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
        // Click on Login and validate
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.title().should('eq','OrangeHRM');
        cy.xpath("//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]").should('be.visible')
    })
})