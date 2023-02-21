describe('Verify login page', {testIsolation: true},() => {
    let userdata;
    let locatordata;
    before( ()=> {
        cy.fixture('LoginPage').then( (data)=> {
            userdata = data;
        })
        cy.fixture('LoginPageLocators').then( (data)=> {
            locatordata = data;
        })
    })
    it('Validate login page content', () => {
        // Navigate to the specified url and validate page title
        cy.visit(userdata.site);
        cy.title().should('eq',userdata.title);
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
        cy.visit(userdata.site);
        cy.title().should('eq',userdata.title);
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//input[@placeholder='Username']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Password']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
    })
    
    it('Validate user cannot login with wrong credentials', () => {
        // Navigate to the specified url and validate page title
        cy.visit(userdata.site);
        cy.title().should('eq',userdata.title);
        cy.xpath("//input[@placeholder='Username']").type(userdata.incorrect_username);
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//input[@placeholder='Password']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Username']").clear();
        cy.xpath("//input[@placeholder='Username']//parent::div//parent::div/span[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'required')]").should('be.visible');
        cy.xpath("//input[@placeholder='Password']").type(userdata.incorrect_password);
        cy.xpath("//input[@placeholder='Username']").type(userdata.incorrect_username);
        cy.xpath("//button[contains(normalize-space(.),'Login')]").click();
        cy.xpath("//p[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'invalid credentials')]").should('be.visible')
    })

    it('Fetch credentials from login page, validate login with valid credentials and logout', () => {
        // Navigate to the specified url and validate page title
        cy.visit(userdata.site);
        cy.title().should('eq',userdata.title);
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
        cy.title().should('eq',userdata.title);
        cy.xpath("//h6[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'dashboard')]").should('be.visible')
        cy.xpath("//img[contains(@alt, 'profile picture')]").click();
        cy.wait(2000);
        cy.xpath("//a[contains(normalize-space(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')), 'logout')]").click();
        cy.wait(2000);
    })
})